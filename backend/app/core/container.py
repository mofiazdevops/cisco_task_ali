from dependency_injector import containers, providers
from app.core.config import configs
from app.core.database import Database
from app.services.auth_service import AuthService
from app.services.user_service import UserService
from app.repository.user_repository import UserRepository
from app.repository.site_repository import SiteRepository
from app.services.rack_service import RackService
from app.repository.rack_repository import RackRepository
from app.services.site_service import SiteService


from app.services.domain_type_service import DomainTypeService
from app.repository.domain_type_repository import DomainTypeRepository

from app.services.roles_service import RolesService
from app.repository.roles_repository import RolesRepository

from app.services.user_profile_service import UserProfileService
from app.repository.user_profile_repository import UserProfileRepository

from app.services.measures_service import MeasuresService
from app.repository.measures_repository import MeasuresRepository

from app.services.user_measures_service import UserMeasuresService
from app.repository.user_measures_repository import UserMeasuresRepository

class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            #"app.api.v1.endpoints.auth",
            #"app.api.v1.endpoints.post",
            #"app.api.v1.endpoints.tag",
            "app.api.v1.endpoints.user",
            "app.api.v2.endpoints.auth",
            "app.api.v2.endpoints.site",
            "app.api.v2.endpoints.rack",
            "app.api.v2.endpoints.setup",

            "app.core.dependencies",
        ]
    )

    db = providers.Singleton(Database, db_url=configs.DATABASE_URI)

    #post_repository = providers.Factory(PostRepository, session_factory=db.provided.session)
    #tag_repository = providers.Factory(TagRepository, session_factory=db.provided.session)
    site_repo = providers.Factory(SiteRepository, session_factory=db.provided.session)
    user_repository = providers.Factory(UserRepository, session_factory=db.provided.session)
    rack_repository = providers.Factory(RackRepository, session_factory=db.provided.session)
    # setup_organization_repository = providers.Factory(SetupOrganizationRepository, session_factory=db.provided.session)
    domain_type_repository = providers.Factory(DomainTypeRepository, session_factory=db.provided.session)
    roles_repository = providers.Factory(RolesRepository, session_factory=db.provided.session)
    # domain_repository = providers.Factory(DomainRepository, session_factory=db.provided.session)
    # role_table_repository = providers.Factory(RoleTableRepository, session_factory=db.provided.session)
    user_profile_repository = providers.Factory(UserProfileRepository, session_factory=db.provided.session)
    measures_repository = providers.Factory(MeasuresRepository, session_factory=db.provided.session)
    user_measures_repository = providers.Factory(UserMeasuresRepository, session_factory=db.provided.session)

    auth_service = providers.Factory(AuthService, user_repository=user_repository)
    site_service = providers.Factory(SiteService, site_repository=site_repo)
    user_service = providers.Factory(UserService, user_repository=user_repository)
    rack_service = providers.Factory(RackService, rack_repository=rack_repository)
    # setup_organization_service = providers.Factory(SetupService, setup_organization=setup_organization_repository)
    domain_type_service = providers.Factory( DomainTypeService, domain_type_repository=domain_type_repository)
    roles_service = providers.Factory(RolesService, roles_repository=roles_repository)
    # domain_service = providers.Factory(DomainService, domain_repository=domain_repository)
    # role_table_service = providers.Factory(RoleTableService, role_table_repository=role_table_repository)
    user_profile_service = providers.Factory(UserProfileService, user_profile_repository=user_profile_repository)
    measures_service = providers.Factory(MeasuresService, measures_repository=measures_repository)
    user_measures_service = providers.Factory(UserMeasuresService, user_measures_repository=user_measures_repository)