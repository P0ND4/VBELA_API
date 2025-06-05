import { ApiResponse } from "../../../../shared/api.response";
import { Collaborator } from "../../types";

export abstract class CollaboratorRepositoryEntity {
  abstract add(identifier: string, collaborator: Collaborator): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, collaborator: Collaborator): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, collaboratorID: string): Promise<ApiResponse<null>>;
}
