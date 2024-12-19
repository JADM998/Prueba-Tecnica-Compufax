## Descripción

En este proyecto implemente una API Restful para operar ordenes, clientes y direcciones en Nest.js.

Implementé la arquitectura limpia con el objetivo de que sea legible, mantenible y escalable. La estructura del proyecto se compone de las siguientes capas:

1. **Domain**: Es la capa donde viven las reglas de negocio.
2. **Application**: Capa donde se implementan características específicas de la aplicación.
3. **Infraestructure**: Aquí viven las implementaciones de repositorios, servicios y bases de datos.
4. **Presentation**: Aquí es donde se define el comportamiento de la API, se exponen controladores y se consume todas las capas anteriores.

# Ejecución

### Instalar paquetes

Lo primero es instalar los paquetes
```bash
  npm install
```

### Variables de entorno

Es importante notar que hay un archivo `.env.template` en la raíz del proyecto. Para poder pasar la validación de las variables de entorno es necesario hacer lo siguiente:

1. Realizar una copia de `.env.template`
2. Renombar la copia a `.env`
3. Rellenar toda la información según sea necesario.


**Nota**: Se obvio la necesidad de una contraseña, para probarlo se deberá tener acceso a una base de datos que se pueda acceder sin contraseña.

### Cargar archivos a base de datos.

Es necesario que se cargue el .sql en una base de datos **mysql** correspondiente a este proyecto para poder operar el proyecto. No se realizaron tareas de carga automática.

### Ejecución

Cumplidos los requisitos se es capaz de realizar la ejecución del proyecto mediante el comando:

```bash
  npm start
```


# Modulos, servicios, datasources y repositorios

Este proyecto tiene la intención de ser modular. Se ofrece este indice de modulos, servicios, repositorios y datasources como una forma de poder entende rápidamente el proyecto.

### Datasources

Los datasources tienen como objetivo ofrecer una API para interactuar con datos almacenados de forma externa, como una base de datos.

En la realización de este proyecto se realizo un datasource para poder conectarse a MySQL de una forma mantenible, mediante la adaptación de el paquete `mysql2`. La datasource en cuestión es `MySqlDatasource` y se encuentra en `./src/infraestructure/datasources/mysql`.

En resumen:

  1. `MySqlDatasource`: Fuente de datos para ejecutar queries en MySQL. Encontrado en `./src/infraestructure/datasources/mysql`.

### Repositorios

Los repositorios tienen como objetivo interactuar con fuentes de datos para proveer a las reglas de negocio. Todos los repositorios desarrollados tiene una `interface` que se encuentra en `./src/domain/repositories` y una implementación que se encuentra en `./src/infraestructure/repositories`. 

La interfaz tiene como objetivo definir las reglas que debe realizar el repositorio, mientras que la implementación debe consumir una fuente de datos en particular y proveer la información necesaria a las reglas de negocio. Este diseño permite no ligarse a una fuente de datos, por lo que es mantenible y escalable.

Este proyecto tiene 3 repositorios:

1. `SqlAddressRepository`: Repositorio para todas las operaciones relacionadas a las direcciones, este repositorio consume una base de datos SQL.
2. `SqlClientRepository`: Repositorio para los clientes.
3. `SqlOrdersRepository`: Repositorio para las ordenes.


### Casos de uso

Los casos de uso manejan la lógica de negocio y son parte fundamental en el desarrollo de software. En este proyecto en particular los casos de uso consumieron en su mayoría al repositorio, devolviendo inmediatamente su resultado, no obstante se encuentran disponibles para ser mantenidos en caso de requerir expandir más funcionalidades. Los casos de uso se ubican en `./src/application/usecases`.

Los casos de uso de este proyecto son:

1. `GetAllAddressUseCase`: Obtener todas las direcciones.
2. `UpdateAddressUseCase`: Actualizar una dirección por id.
3. `CreateOrderUseCase`: Crear una orden.
4. `GetAllOrdersUseCase`: Obtener todas las ordenes disponibles.
5. `GetOrderByClientIdUseCase`: Obtener las ordenes por el cliente_id.
6. `GetOrdersByOrderCodeUseCase`: Obtener las ordenes por el folio.
7. `CreateClientUseCase`: Crear un nuevo cliente.
8. `GetAllClientsUseCase`: Obtener todos los clientes.
9. `GetClientById`: Obtener un cliente por su identificador.

### Servicios y Clases auxiliares

Existen algunos servicios y clases auxiliares para realizar algunas acciones y facilitar la interacción con la API. La ubicación de estas clases depende de su utilidad. Los servicios y auxiliares de este proyecto son:


#### `./src/application/common`
1. ``AppExceptionFactory``: Clase auxiliar encargada de generar un error para poder hacer `throw` de errores sencillamente. Esta clase es `Injectable`.
2. `AppTokens`: Clase auxiliar para manejar los Tokens de inyección de Nest de una manera centralizada.

#### `./src/infraestructure/configuration`
1. `EnviromentVariablesService`: Servicio que utiliza `ConfigService` de `Nest` para manejar las variables de entorno. Esta clase es `Injectable` y `Global`.


#### `./src/presnetation/common/exception-filter`

1. `GlobalExceptionFilter`: Clase auxiliar que se usa para filtrar excepciones y poder mapear errores tirados mediante `AppExceptionsFactory` a errores `HttpException`.

### Modulos

Los modulos de esta aplicación son los siguientes:

1. `AppModule`: Modulo principal de la aplicación.
2. `AddressModule`: Modulo del controlador de las rutas `/direcciones`.
3. `OrdersModule`: Modulo del controlador de las rutas `/ordenes`.
4. `ClientsModule`: Modulo del controlador de las rutas `/clientes`.
5. `EnviromentConfigModule`: Modulo de importación para el servicio global `EnviromentVariablesService`.
6. `AppExceptionFactoryModule`: Modulo de importacion para la clase auxiliar y global de factoría `AppExceptionFactory`.
7. `SqlRepositoryModule`: Modulo de importación para los repositorios con implementación de `MySqlDatasource`. En caso de cambiar de base de datos se realizaría otra datasource y se crearía un nuevo módulo, con los mismos proveedores y exportaciones.

