import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiaoPackage/camiao";
import { CamiaoId } from "../../domain/camiaoPackage/camiaoId";
import { Matricula } from "../../domain/camiaoPackage/matricula";

export default interface ICamiaoRepo extends Repo<Camiao> {
  save(camiao: Camiao): Promise<Camiao>;
  findByMatricula(matricula: Matricula | string): Promise<Camiao>;
  findById(camiaoId: CamiaoId): Promise<Camiao>;
  findAll(): Promise<Array<Camiao>>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}