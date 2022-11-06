import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiaoPackage/camiao";
import { CamiaoId } from "../../domain/camiaoPackage/camiaoId";
import { NameId } from "../../domain/camiaoPackage/nameId";

export default interface ICamiaoRepo extends Repo<Camiao> {
  exists (camiaoId: CamiaoId | string): Promise<boolean>;
  save(camiao: Camiao): Promise<Camiao>;
  findById (camiaoId: CamiaoId | string): Promise<Camiao>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}