import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { V1_WS } from '../route.constants';
import { WsJwtGuard } from './ws-jwt.guard';
import { Logger } from '@nestjs/common';

// Mapeo completo de permisos a campos
const permissionMap = {
  accessToInventory: [
    'stocks',
    'stockGroup',
    'inventories',
    'recipes',
    'recipeGroup',
    'movements',
    'portions',
    'portionGroup',
  ],
  accessToStore: ['stores', 'productGroup', 'products', 'sales'],
  accessToKitchen: ['kitchens'],
  accessToRestaurant: [
    'restaurants',
    'menuGroup',
    'menu',
    'orders',
    'tables',
  ],
  accessToEconomy: ['economies', 'economicGroup'],
  accessToSupplier: ['suppliers'],
  accessToCollaborator: ['collaborators'],
  accessToStatistics: ['initialBasis', 'handlers'],
};

@WebSocketGateway({ namespace: V1_WS })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private wsGuard: WsJwtGuard) {}

  private joinPermissionRooms(client: Socket, permissions: string[]) {
    // Sala principal por usuario
    const { id: userId } = client.data.user;
    client.join(`user_${userId}`);
    
    // Salas por permisos
    permissions.forEach(permission => {
      if (permissionMap[permission]) {
        permissionMap[permission].forEach(room => {
          client.join(`perm_${room}`);
          this.logger.log(`Usuario ${userId} unido a sala perm_${room}`);
        });
      }
    });
  }

  async handleConnection(client: Socket) {
    try {
      await this.wsGuard.validateClient(client);
      const { id: userId, permissions } = client.data.user;

      // Unirse a salas según permisos
      this.joinPermissionRooms(client, permissions);
      
      this.logger.log(`Cliente autenticado: ${client.id} (Usuario: ${userId})`);
    } catch (error) {
      this.logger.warn(`Conexión rechazada: ${client.id}`, error.message);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.user?.id || 'unknown';
    this.logger.log(`Cliente desconectado: ${client.id} (Usuario: ${userId})`);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, @MessageBody() room: string) {
    client.leave(room);
    this.logger.log(`Usuario ${client.data.user.id} salió de la sala ${room}`);
  }

  @SubscribeMessage('update-change')
  updateChange(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { entity: string; }
  ) {
    const { entity } = data;
    
    // Enviar solo a la sala correspondiente a la entidad modificada
    this.server.to(`perm_${entity}`).emit('update-change', "refresh-data");
    
    // Loggear la acción
    this.logger.log(
      `Actualización de ${entity} por usuario ${client.data.user.id}`
    );
  }
}