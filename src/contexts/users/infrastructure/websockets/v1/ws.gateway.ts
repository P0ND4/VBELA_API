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
import { permissionMap } from '../../constants/permission.constants';
import { PendingNotificationService } from '../../services/pending-notification.service';

@WebSocketGateway({ namespace: V1_WS })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private wsGuard: WsJwtGuard,
    private pendingNotificationService: PendingNotificationService,
  ) {}

  private joinPermissionRooms(client: Socket, permissions: string[]) {
    // Sala principal por usuario
    const { id: userId } = client.data.user;

    const permissionsToProcess =
      permissions === null ? permissionMap : permissions;

    // Salas por permisos
    Object.keys(permissionsToProcess).forEach((entity) =>
      client.join(`perm_${entity}_${userId}`),
    );
  }

  async handleConnection(client: Socket) {
    try {
      await this.wsGuard.validateClient(client);
      const { id: userId, permissions, identifier } = client.data.user;

      const room = `${identifier}_${userId}`;
      client.join(room);
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

  @SubscribeMessage('validate')
  async validate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { logout: boolean },
  ) {
    const { id: userId, identifier } = client.data.user;

    const validation =
      await this.pendingNotificationService.validatePendingNotification(
        identifier,
      );

    const room = `${identifier}_${userId}`;
    if (validation && data.logout) this.server.to(room).emit('logout');
  }

  @SubscribeMessage('PING')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('PONG', { timestamp: Date.now() });
  }

  @SubscribeMessage('account-updated')
  async accountUpdated(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { identifier: string },
  ) {
    const { id: userId } = client.data.user;
    const room = `${data.identifier}_${userId}`;

    // Emitir a todos en la sala
    this.server.to(room).emit('logout');

    // Si no hay nadie en la sala, crear notificación pendiente
    const sockets = await this.server.in(room).fetchSockets();
    if (sockets.length === 0) {
      await this.pendingNotificationService.createPendingNotification(
        data.identifier,
      );
    }
  }

  @SubscribeMessage('update-change')
  updateChange(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { entity: string },
  ) {
    const { id: userId } = client.data.user;
    const { entity } = data;

    // Enviar solo a la sala correspondiente a la entidad modificada
    client.broadcast
      .to(`perm_${entity}_${userId}`)
      .emit('update-change', 'refresh-data');

    // Loggear la acción
    this.logger.log(
      `Actualización de ${entity} por usuario ${client.data.user.identifier}`,
    );
  }
}
