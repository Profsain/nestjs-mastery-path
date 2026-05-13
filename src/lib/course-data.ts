export type Lesson = {
  id: string;
  title: string;
  duration: string;
  content: string;
};

export type ModuleVideo = {
  title: string;
  channel: string;
  query: string; // YouTube search query — used to build watch link
};

export type Module = {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  /** PDF-sourced module overview rendered with the same Markdown engine as lessons. */
  overview: string;
  /** A curated YouTube tutorial that explains the module. */
  video: ModuleVideo;
  lessons: Lesson[];
};

// ---------- MODULE 1 — Full instructional content ----------

const m1l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand what backend engineering truly means
- Understand how applications communicate
- Understand APIs, servers, databases, and clients
- Understand monolith vs microservices
- Understand why Nest.js exists

[video:GHTA143_b-s]

## Lesson Introduction

Imagine opening WhatsApp, Instagram, Moniepoint, Uber, or Netflix. When you click a button, what actually happens behind the scenes? How does your login work? How do your messages save instantly? How does your payment process securely?

That invisible system powering everything is the **backend**.

> [!TIP]
> **Pro Tip:** In the professional world, "Backend Engineering" is about more than just writing code; it's about designing systems that are reliable, secure, and can handle millions of users.

## What Is a Backend?

The backend is the **engine room** of an application. It handles business logic, authentication, database operations, security, payments, notifications, file storage, APIs, and scalability.

The backend is responsible for **making applications actually work**.

## Real-World Analogy — Restaurant System

### Frontend = Waiter
The waiter takes your order, shows you the menu, and communicates with you. This is what users interact with: mobile apps, websites, dashboards.

### Backend = Kitchen
The kitchen processes requests, prepares food, checks ingredients, and manages cooking operations. The user never sees the kitchen — but everything depends on it.

### Database = Storage Room
The storage room stores ingredients, inventory, and records. In applications: user accounts, passwords, transactions, uploaded files, and product data live in databases.

## How Applications Communicate

Modern applications communicate using **APIs** — Application Programming Interfaces. An API is a messenger that lets systems talk to each other.

### Simple Flow of a Request

\`\`\`text
User clicks "Login"
        ↓
Frontend sends request to backend API
        ↓
Backend validates credentials
        ↓
Database checks user data
        ↓
Backend generates token
        ↓
Frontend receives response
        ↓
User gets logged in
\`\`\`

## Visual Mental Model

\`\`\`text
Frontend (React/Mobile App)
        ↓
     API Request
        ↓
Backend Server (Nest.js)
        ↓
Database (PostgreSQL/MongoDB)
        ↓
API Response
        ↓
Frontend Updates UI
\`\`\`

## What Is a Server?

A server is simply **a computer that listens for requests and responds**. Login requests, payment requests, fetching a user profile, uploading an image — servers run backend applications to handle these.

## What Is Node.js?

Node.js allows JavaScript to run **outside the browser**. Before Node.js, JavaScript only worked in browsers. After Node.js, JavaScript could power servers. This changed software engineering forever.

### Why Node.js Became Popular

- Fast
- Scalable
- Event-driven
- Great for APIs and real-time systems

Companies using Node.js: Netflix, PayPal, Uber, LinkedIn, Walmart.

## The Problem With Large Node.js Apps

As applications grow, code becomes messy, scaling becomes difficult, architecture becomes inconsistent, and debugging becomes painful. This is why frameworks exist.

## What Is Nest.js?

NestJS is an **enterprise-grade Node.js framework**. It provides architecture, structure, scalability, maintainability, and clean code patterns. Nest.js is heavily inspired by Angular architecture, SOLID principles, and enterprise backend engineering.

### Why Companies Love Nest.js

- Modular architecture
- Dependency injection
- TypeScript-first
- Microservices support
- Built-in testing tools
- Enterprise patterns

## Monolith vs Microservices

### Monolith Architecture

Everything exists inside one application.

\`\`\`text
App
 ├── Auth
 ├── Payments
 ├── Notifications
 ├── Orders
 └── Users
\`\`\`

**Advantages:** easier to start, simpler deployment, faster MVP.
**Disadvantages:** hard to scale, tightly coupled, difficult maintenance.

### Microservices Architecture

Each service is independent.

\`\`\`text
Auth Service
Payment Service
Notification Service
User Service
\`\`\`

**Advantages:** scalable, independently deployable, fault isolation.
**Disadvantages:** more complexity, distributed systems challenges, harder DevOps.

> [!CAUTION]
> **Common Pitfall:** Don't start with microservices on day one for a simple app. Start with a well-structured monolith (which NestJS makes easy) and split it later when you actually need to scale.

## Practical Exercise

Analyze 3 applications you use daily. For each app, identify the frontend, possible backend operations, and likely database usage.

**Example — WhatsApp:**
- Frontend: Mobile app
- Backend: Message processing
- Database: Chat history storage

## Lesson Outro

You now understand how modern applications actually work, the role of backend engineering, and why scalable architecture matters. In the next lesson you'll install Nest.js, set up a professional backend environment, and create your first Nest.js application.`;

const m1l2 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the tools professional backend engineers use
- Install and configure a complete backend development environment
- Understand how a Nest.js project is structured
- Create and run your first Nest.js application

## Lesson Introduction

Before engineers build scalable backend systems, they first build their **environment**. A poorly configured environment causes bugs, slow productivity, deployment issues, and debugging frustration. Professional developers optimize their environment early.

## What You Will Install

- **Node.js** — runs JavaScript outside the browser
- **Visual Studio Code** — code editor
- **NestJS CLI** — generates Nest applications
- **Postman / Thunder Client** — tests APIs
- **Git** — version control
- **Docker** — containerization
- **npm** — installs packages

## Installing Node.js

Visit the Node.js official website and install the **LTS** version.

\`\`\`bash
node -v
npm -v
\`\`\`

## What Is npm?

npm means **Node Package Manager**. It installs external libraries — think of npm as an app store for backend developers.

\`\`\`bash
npm install express
\`\`\`

## Installing Visual Studio Code

### Recommended Extensions

- **ESLint** — code quality
- **Prettier** — auto formatting
- **Thunder Client** — API testing
- **Docker** — Docker integration
- **GitLens** — Git visualization

Professional teams enforce consistent code. Prettier automatically formats code professionally.

## Installing Git

\`\`\`bash
git --version
\`\`\`

Git tracks code changes — without it, collaboration becomes difficult, mistakes become dangerous, and deployment pipelines fail.

## Installing the Nest.js CLI

\`\`\`bash
npm install -g @nestjs/cli
nest --version
\`\`\`

## Creating Your First Nest.js Application

\`\`\`bash
nest new backend-api
\`\`\`

Choose \`npm\` when prompted. Nest.js automatically creates the folder structure, configuration files, TypeScript setup, testing setup, and dependency injection system.

\`\`\`bash
cd backend-api
code .
\`\`\`

## Project Structure Breakdown

\`\`\`text
src/
 ├── app.controller.ts
 ├── app.service.ts
 ├── app.module.ts
 ├── main.ts
\`\`\`

### main.ts — The Entry Point

\`\`\`ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
\`\`\`

### app.module.ts — The Root Module

The brain organizing the application. Modules group features together.

### app.controller.ts — Handles Requests

\`\`\`ts
@Get()
findAll() {
  return "Hello World";
}
\`\`\`

### app.service.ts — Business Logic

\`\`\`ts
getHello(): string {
  return 'Hello World!';
}
\`\`\`

## Running the Application

\`\`\`bash
npm run start:dev
\`\`\`

Visit \`http://localhost:3000\` — you should see **Hello World!**

### What Just Happened?

1. Browser sent HTTP request
2. Nest.js received the request
3. Controller handled it
4. Service returned a response
5. Browser displayed the result

This is the **backend request lifecycle**.

## Development Mode vs Production

\`\`\`bash
# Development — auto reload, debugging
npm run start:dev

# Production — optimized, deployed
npm run build
npm run start:prod
\`\`\`

## Why TypeScript?

Nest.js uses TypeScript by default for type safety, scalability, maintainability, and better developer experience.

\`\`\`ts
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

## Common Beginner Mistakes

- **Fear of folder structure** — structure creates clarity
- **Skipping fundamentals** — copying tutorials without understanding
- **Ignoring terminal skills** — backend engineers must be comfortable with the terminal

## Quick Knowledge Check

**Q1.** What is the role of \`main.ts\`?
- A. Stores database models
- **B. Starts the application** ✓
- C. Handles authentication
- D. Creates APIs

**Q2.** What does a controller do?
- **B. Handles requests and responses** ✓

**Q3.** Why does Nest.js use TypeScript?
- **A. Better scalability and type safety** ✓

## Practical Exercise

### Exercise 1 — Create Your First Endpoint

\`\`\`ts
@Get()
getHello(): string {
  return "Welcome to Nest.js Backend Engineering";
}
\`\`\`

### Exercise 2 — Change Server Port

\`\`\`ts
await app.listen(5000);
\`\`\`

### Mini Challenge

Create an \`/about\` route returning: *"This is my first professional Nest.js backend application."*

## Assignment — Developer Profile API

Build endpoints \`/\`, \`/about\`, \`/skills\`. Each returns custom text. Example: \`/skills → JavaScript, TypeScript, Nest.js\`.

## Lesson Outro

You've built your first backend server, understood professional tooling, and explored Nest.js architecture. Next: modules, controllers, providers, and dependency injection — where Nest.js begins to feel truly powerful.`;

const m1l3 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the core architecture of NestJS
- Understand Modules, Controllers, and Providers
- Understand Dependency Injection deeply
- Build a properly structured feature module

## Lesson Introduction

Most beginner backend applications become messy very quickly because developers place everything in one file, duplicate logic, tightly couple components, and ignore architecture. This works for tiny projects — but completely fails in real-world engineering.

Professional backend systems need organization, scalability, maintainability, and **separation of concerns**. This is exactly what Nest.js solves.

## The Big Idea of Nest.js

Nest.js is not just *"a way to create APIs"* — it's **a system for organizing backend applications professionally**.

## The 3 Core Building Blocks

| Component | Responsibility |
|-----------|----------------|
| **Module** | Organizes features |
| **Controller** | Handles requests |
| **Provider / Service** | Contains business logic |

## Real-World Analogy — A Hospital System

- **Module = Department** (Cardiology, Pediatrics, Surgery)
- **Controller = Receptionist** (receives patients, directs requests)
- **Service = Doctor** (performs operations, contains actual expertise)

## Visual Architecture Flow

\`\`\`text
Request
   ↓
Controller
   ↓
Service
   ↓
Database / API
   ↓
Response
\`\`\`

## Understanding Modules

A module groups related functionality together: Users Module, Payments Module, Auth Module, Notifications Module.

\`\`\`ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
\`\`\`

### Generating a Module

\`\`\`bash
nest g mo users
\`\`\`

## Understanding Controllers

Controllers handle incoming HTTP requests — they define routes, endpoints, and request handling.

\`\`\`ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return "All users";
  }
}
\`\`\`

### Controllers Should Stay Thin

One of the biggest beginner mistakes is putting business logic inside controllers. This makes testing difficult, duplicates logic, and breaks scalability.

## The Role of Services

\`\`\`ts
@Injectable()
export class UsersService {
  findAllUsers() {
    return ["John", "Sarah"];
  }
}
\`\`\`

### Controller Using Service

\`\`\`ts
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }
}
\`\`\`

## Understanding Dependency Injection

**Dependency Injection means giving a class the resources it needs automatically** — instead of creating them manually.

### Restaurant Analogy

Without DI: the chef buys ingredients, manages delivery, and handles everything. Messy.
With DI: the kitchen system provides ingredients automatically. The chef focuses on cooking. Nest.js works the same way.

### Without DI

\`\`\`ts
const usersService = new UsersService();
\`\`\`

Tight coupling, hard testing, poor scalability.

### With DI

\`\`\`ts
constructor(private usersService: UsersService) {}
\`\`\`

Nest.js automatically creates the instance, manages its lifecycle, and injects it.

### What Does @Injectable() Mean?

\`\`\`ts
@Injectable()
export class UsersService {}
\`\`\`

It tells Nest.js: *"This class can be injected."*

## Tracing a Real Request

1. **Client request:** \`GET /users\`
2. **Controller receives:** \`findAll()\`
3. **Controller calls service:** \`this.usersService.findAllUsers()\`
4. **Service returns:** \`["John", "Sarah"]\`
5. **Response sent back**

## Building a Feature Module

\`\`\`bash
nest g module products
nest g controller products
nest g service products
\`\`\`

### products.service.ts

\`\`\`ts
@Injectable()
export class ProductsService {
  findAllProducts() {
    return ["Laptop", "Keyboard", "Mouse"];
  }
}
\`\`\`

### products.controller.ts

\`\`\`ts
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }
}
\`\`\`

Visit \`http://localhost:3000/products\` — you'll see the array. You've now built a real, scalable feature with modules, controllers, services, and dependency injection.

## Common Beginner Mistakes

- Putting logic inside controllers
- Fearing dependency injection ("looks complicated") — in reality, DI makes large systems **manageable**
- Ignoring architecture for the sake of "just making it work"

## Quick Knowledge Check

**Q1.** Primary role of a controller? **B. Handle requests** ✓
**Q2.** Where should business logic live? **C. Services** ✓
**Q3.** What is Dependency Injection? **B. Automatic dependency management** ✓

## Practical Exercise

### Exercise 1 — Users Feature
Generate module + controller + service for \`users\`.

### Exercise 2 — Return Mock Data
\`/users\` returns:

\`\`\`json
[
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Sarah" }
]
\`\`\`

### Exercise 3 — Courses Feature
\`/courses\` returns \`["Nest.js", "Docker", "Microservices"]\`.

## Assignment — Mini E-Learning API Structure

Features: \`users\`, \`courses\`, \`instructors\`. Each must have its own module + controller + service, return mock data, and use dependency injection properly.

## Lesson Outro

You now understand the true architecture of Nest.js — how professional systems are organized and why dependency injection matters. Next: TypeScript deep dive with interfaces, DTOs, classes, and generics — the leap from JavaScript developer to professional backend engineer.`;

const m1l4 = `## Lesson Objective

By the end of this lesson, you will:

- Understand why TypeScript is critical in backend engineering
- Master types, interfaces, classes, and DTOs
- Build strongly typed backend structures
- Think like a professional software engineer

## Lesson Introduction

Many beginner developers write code that works — but breaks easily as applications grow. Professional engineering is not just *"making code run"*. It is reliability, maintainability, scalability, and predictability. This is why TypeScript dominates modern backend engineering.

## What Is TypeScript?

TypeScript is a **superset of JavaScript** — all JavaScript is valid TypeScript, but TypeScript adds **type safety**.

### Building Construction Analogy

You would never construct a skyscraper without measurements, blueprints, validation, or safety checks. JavaScript alone is flexible, but large applications need structure. TypeScript provides it.

### Why Large Companies Use TypeScript

Google, Microsoft, Airbnb, Slack, and Stripe all rely on TypeScript because it reduces bugs, improves scalability, and improves collaboration.

## JavaScript vs TypeScript

\`\`\`js
// JavaScript
function add(a, b) { return a + b; }
add("5", 2); // → "52" 😱
\`\`\`

\`\`\`ts
// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

TypeScript protects you from silent bugs that become expensive at scale.

## Basic Types

\`\`\`ts
let name: string = "Hussein";
let age: number = 25;
let isAdmin: boolean = true;
let skills: string[] = ["Nest.js", "Docker", "TypeScript"];
\`\`\`

### Type Inference

\`\`\`ts
let course = "Nest.js"; // inferred as string
\`\`\`

## Functions

\`\`\`ts
function multiply(a: number, b: number): number {
  return a * b;
}
\`\`\`

Return types enforce predictable outputs in large systems.

## Interfaces

Interfaces define object structure — they are **blueprints for data**.

\`\`\`ts
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Sarah",
  email: "sarah@example.com"
};
\`\`\`

Without interfaces: inconsistent data, difficult debugging. With interfaces: consistency, scalability, collaboration.

## Classes

Nest.js heavily uses classes because they support dependency injection, decorators, OOP architecture, and scalability.

\`\`\`ts
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("John");
\`\`\`

## Understanding DTOs

A **DTO (Data Transfer Object)** defines the shape of incoming or outgoing data.

### Without DTOs (Bad)

\`\`\`ts
createUser(data: any) // unpredictable, insecure
\`\`\`

### With DTOs (Good)

\`\`\`ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
\`\`\`

### Using DTO in Controller

\`\`\`ts
@Post()
createUser(@Body() dto: CreateUserDto) {
  return dto;
}
\`\`\`

DTOs provide validation, predictability, cleaner APIs, security, and maintainability.

## Optional Properties

\`\`\`ts
interface User {
  name: string;
  bio?: string; // optional
}
\`\`\`

## Union Types

\`\`\`ts
let id: string | number;
\`\`\`

## Enums

Used heavily in permissions, authentication, RBAC:

\`\`\`ts
enum UserRole {
  ADMIN,
  USER,
  INSTRUCTOR
}
\`\`\`

## Generics

Generics create reusable structures:

\`\`\`ts
function identity<T>(value: T): T {
  return value;
}
\`\`\`

## Common Beginner Mistakes

- **Using \`any\` everywhere** — defeats the purpose of TypeScript
- **Ignoring interfaces** — hardcoding objects everywhere
- **Fearing types** — at first they feel strict, later they feel protective

## Building a Real DTO

\`\`\`ts
// create-course.dto.ts
export class CreateCourseDto {
  title: string;
  instructor: string;
  price: number;
  isPublished: boolean;
}
\`\`\`

\`\`\`ts
@Post()
createCourse(@Body() dto: CreateCourseDto) {
  return dto;
}
\`\`\`

Incoming requests must now follow a predictable structure.

## Quick Knowledge Check

**Q1.** Primary purpose of TypeScript? **B. Type safety and scalability** ✓
**Q2.** DTO stands for? **A. Data Transfer Object** ✓
**Q3.** Why are interfaces useful? **B. Object structure consistency** ✓

## Practical Exercise

### Exercise 1 — Interface
Create \`interface Product\` with \`id\`, \`name\`, \`price\`, \`inStock\`.

### Exercise 2 — DTO
Create \`create-product.dto.ts\` with \`name\`, \`description\`, \`price\`.

### Exercise 3 — Enum
Create \`enum UserRole\` with \`ADMIN\`, \`USER\`, \`INSTRUCTOR\`.

### Mini Challenge
Build \`CreateStudentDto\` with \`firstName\`, \`lastName\`, \`email\`, \`course\`, \`age\`.

## Assignment — Typed Course Management API Structure

Build typed interfaces, DTOs, and enums for \`courses\`, \`students\`, \`instructors\`. Avoid \`any\`. Each feature must return typed data.

## Lesson Outro

You now understand why TypeScript dominates enterprise engineering and how scalable systems structure data. This is the transition from *coding applications* to *engineering systems*. Next: middleware, pipes, guards, interceptors, and exception filters — the true internal lifecycle of Nest.js applications.`;

const m1l5 = `## Lesson Objective

By the end of this lesson, you will:

- Understand how requests flow internally in NestJS
- Master Middleware, Pipes, Guards, Interceptors, and Exception Filters
- Learn how enterprise APIs process requests securely
- Build request-processing layers professionally

## Lesson Introduction

When a user sends a request to a backend application, **a lot happens behind the scenes**: authentication checks, validation, logging, transformation, error handling, response formatting. Professional backend systems process requests in **layers**. Nest.js provides a beautiful architecture for this.

## The Big Picture — Request Lifecycle

\`\`\`text
Request
  ↓
Middleware
  ↓
Guards
  ↓
Interceptors (Before)
  ↓
Pipes
  ↓
Controller
  ↓
Service
  ↓
Interceptors (After)
  ↓
Exception Filters
  ↓
Response
\`\`\`

### Airport Security Analogy

Entering an international airport: you pass through layers — security checkpoint, passport verification, luggage inspection, boarding validation. Backend systems work the same way; each layer has a responsibility.

## What Is Middleware?

Middleware runs **before the request reaches the controller**. Commonly used for logging, authentication preprocessing, request tracking, and request modification.

\`\`\`ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(\`\${req.method} \${req.originalUrl}\`);
    next();
  }
}
\`\`\`

\`next()\` tells Nest.js *"continue processing"*. Without it, the request hangs.

### Applying Middleware

\`\`\`ts
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
\`\`\`

## What Are Pipes?

Pipes handle **validation, transformation, and sanitization** — before controller methods execute.

### Why Validation Matters

Imagine users sending \`{ "email": false, "password": 123 }\` — without validation, systems break, databases become inconsistent, security risks increase.

### Enable Global Validation

\`\`\`ts
// main.ts
app.useGlobalPipes(new ValidationPipe());
\`\`\`

\`\`\`ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
\`\`\`

### Transformation

Pipes can automatically convert \`"25"\` to \`25\` — improving API consistency.

## What Are Guards?

Guards determine **whether requests are allowed**. Used for authentication, authorization, role checks, and permissions.

### Security Officer Analogy

A guard checks your ID card and access permissions before allowing entry.

\`\`\`ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return Boolean(request.headers.authorization);
  }
}
\`\`\`

### Applying a Guard

\`\`\`ts
@UseGuards(AuthGuard)
@Get('profile')
getProfile() { /* protected */ }
\`\`\`

## What Are Interceptors?

Interceptors **wrap** the request lifecycle — they run before AND after the handler. Use them for logging, caching, response shaping, and timeouts.

\`\`\`ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => console.log(\`Took \${Date.now() - start}ms\`)),
    );
  }
}
\`\`\`

## What Are Exception Filters?

Exception filters catch errors and shape error responses consistently.

\`\`\`ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception.getStatus();
    res.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
\`\`\`

## Putting It All Together

A real enterprise request flow:

1. **Middleware** logs the request
2. **Guards** check authentication
3. **Interceptors** start a timer
4. **Pipes** validate the body via DTO
5. **Controller** receives the typed input
6. **Service** runs business logic
7. **Interceptors** log duration
8. **Exception Filters** catch any error
9. **Response** returns to the client

## Common Beginner Mistakes

- Putting authentication logic inside controllers instead of guards
- Skipping validation pipes — leading to inconsistent data
- Letting errors leak raw stack traces in production
- Mixing logging concerns into business services

## Quick Knowledge Check

**Q1.** Which layer handles authentication checks? **Guards** ✓
**Q2.** Which layer handles validation and transformation? **Pipes** ✓
**Q3.** Which layer wraps the request lifecycle before AND after? **Interceptors** ✓

## Practical Exercise

1. Create a \`LoggerMiddleware\` that logs every request method + URL.
2. Create an \`AuthGuard\` that blocks requests missing an \`Authorization\` header.
3. Apply \`ValidationPipe\` globally and protect a \`POST /users\` route with a DTO.
4. Build a \`LoggingInterceptor\` that prints response time.
5. Build an \`HttpExceptionFilter\` that returns a consistent error JSON.

## Assignment — Request Pipeline Lab

Build a feature module \`orders\` that uses **all five** request-layer concepts: middleware, guard, pipe, interceptor, and exception filter. Document what each layer does in a \`README.md\`.

## Lesson Outro

You now understand the true internal lifecycle of Nest.js applications — the same architecture used by enterprise teams to ship secure, scalable APIs. Module 1 complete. Next module: building production-grade REST APIs with CRUD, validation, Swagger, pagination, and logging.`;

// ---------- Modules 2–9 — full lesson content ----------

// ===== Module 2: Production-Grade REST APIs =====

const m2l1 = `## Lesson Objective

By the end of this lesson, you will:

- Master the fundamental CRUD (Create, Read, Update, Delete) operations
- Understand how to structure routes and controllers professionally
- Learn to handle different HTTP methods properly
- Build a real-world product management API

[video:GHTA143_b-s]

## What is CRUD?

CRUD is the bread and butter of backend engineering. Almost every application—from Twitter to Amazon—is built on these four operations.

| Operation | HTTP Method | Use Case |
|-----------|-------------|----------|
| **C**reate | \`POST\` | Adding a new item |
| **R**ead | \`GET\` | Fetching data |
| **U**pdate | \`PUT / PATCH\` | Modifying existing data |
| **D**elete | \`DELETE\` | Removing data |

## Building Your First CRUD Controller

In Nest.js, controllers are decorated with \`@Controller()\`.

\`\`\`ts
@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return 'This action returns all products';
  }

  @Post()
  create() {
    return 'This action adds a new product';
  }
}
\`\`\`

> [!TIP]
> **Pro Tip:** Use \`PATCH\` for partial updates (e.g., updating just the price) and \`PUT\` for full replacements. In modern APIs, \`PATCH\` is often preferred for its flexibility.

## Handling Route Parameters

How do you fetch a specific product? By its **ID**.

\`\`\`ts
@Get(':id')
findOne(@Param('id') id: string) {
  return \`This action returns product #\${id}\`;
}
\`\`\`

## Handling Request Bodies

When creating a product, the client sends data in the body. We use \`@Body()\` to access it.

\`\`\`ts
@Post()
create(@Body() body: any) {
  return body;
}
\`\`\`

> [!CAUTION]
> **Common Pitfall:** Never use \`any\` for request bodies in production! Use **DTOs (Data Transfer Objects)** to define and validate the shape of your data. We'll cover this in the next lesson.

## Practical Exercise

Create a \`TasksController\` with endpoints for:
1. \`GET /tasks\` (all tasks)
2. \`POST /tasks\` (new task)
3. \`DELETE /tasks/:id\` (delete task)

## Lesson Outro

You've mastered the core of REST APIs! But right now, our API is "dumb"—it doesn't validate data or handle errors gracefully. Next, we'll dive into **Data Validation & DTOs** to make our API production-ready.
## Assignment

Design a \`/tasks\` API with sub-resources \`/tasks/:id/comments\`. Document each endpoint's verb, path, payload, and response code.`;

const m2l2 = `## Lesson Objective

Master class-validator, validation pipes, and global exception filters so your API never accepts bad data and never leaks raw errors.

## Validation pipes

Nest's \`ValidationPipe\` reads the metadata on a DTO and rejects invalid payloads automatically. Enable it globally in \`main.ts\`:

\`\`\`ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // strip unknown fields
    forbidNonWhitelisted: true,
    transform: true,       // auto-convert types (e.g. string → number)
  }));
  await app.listen(3000);
}
\`\`\`

## class-validator decorators

\`\`\`ts
export class CreateUserDto {
  @IsEmail()                email: string;
  @MinLength(8)             password: string;
  @IsOptional() @IsInt()    age?: number;
  @IsEnum(['admin','user']) role: string;
}
\`\`\`

If a client posts \`{ email: "not-an-email" }\`, Nest responds with a 400 Bad Request automatically — no manual checks in your service.

## Global exception filter

Without a filter, errors leak stack traces. With one, you return a consistent shape:

\`\`\`ts
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    res.status(status).json({
      statusCode: status,
      message: exception instanceof HttpException
        ? exception.message
        : 'Internal server error',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
\`\`\`

Register globally: \`app.useGlobalFilters(new AllExceptionsFilter());\`

## Throwing meaningful errors

\`\`\`ts
if (!user) throw new NotFoundException('User not found');
if (!isOwner) throw new ForbiddenException();
if (emailTaken) throw new ConflictException('Email already in use');
\`\`\`

## Exercise

Build a \`UpdateProductDto\` with field-level validation, a global filter that logs every 5xx error, and a custom \`@IsStrongPassword()\` validator.

## Assignment

Audit your existing endpoints and document for each: which DTO validates input, which exceptions are thrown, what response shape clients see.`;

const m2l3 = `## Lesson Objective

Document your API automatically with Swagger (OpenAPI) so frontend teams and partners can consume it without asking you questions.

## Why OpenAPI matters

The book stresses that documentation is critical when an API will be consumed by others — otherwise the client developer doesn't know what to send or what they get back. **Swagger** is the most popular documentation engine, and Nest ships an official module: \`@nestjs/swagger\`.

## Setup

\`\`\`bash
npm install @nestjs/swagger swagger-ui-express
\`\`\`

\`\`\`ts
// main.ts
const config = new DocumentBuilder()
  .setTitle('Blog API')
  .setDescription('Production REST API for the blog example')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
\`\`\`

Visit \`http://localhost:3000/docs\` for a live, interactive UI.

## Decorating DTOs and controllers

\`\`\`ts
export class CreateEntryDto {
  @ApiProperty({ example: 'Hello Nest' })
  title: string;

  @ApiProperty({ example: 'Long form post body…' })
  body: string;

  @ApiPropertyOptional({ default: false })
  published?: boolean;
}

@ApiTags('entries')
@Controller('entries')
export class EntryController {
  @Post()
  @ApiOperation({ summary: 'Create a blog entry' })
  @ApiResponse({ status: 201, description: 'Entry created' })
  create(@Body() dto: CreateEntryDto) { /* ... */ }
}
\`\`\`

## API versioning

\`\`\`ts
app.enableVersioning({ type: VersioningType.URI });

@Controller({ path: 'entries', version: '1' })
export class EntryControllerV1 {}
\`\`\`

Now \`/v1/entries\` is the URL — and you can ship v2 without breaking clients.

## Practices

- Document every public DTO field with \`@ApiProperty\`
- Group routes with \`@ApiTags\`
- Add examples, not just types — examples make docs usable
- Keep the OpenAPI JSON in version control to track API changes in PRs

## Assignment

Wire Swagger into your CRUD module, version your routes, and export the OpenAPI JSON. Open a PR titled "API v1 published" with the JSON attached.`;

const m2l4 = `## Lesson Objective

Implement scalable pagination, filtering, sorting, and search using query parameters — the patterns real-world APIs depend on.

## The problem with \`GET /users\`

Without limits, returning every row is a denial-of-service against your own database. Real APIs always paginate.

## Offset pagination

Simple, familiar, but slow at high page numbers:

\`\`\`ts
@Get()
async findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
) {
  const [items, total] = await this.repo.findAndCount({
    skip: (page - 1) * limit,
    take: Math.min(limit, 100),
  });
  return { items, total, page, pageCount: Math.ceil(total / limit) };
}
\`\`\`

## Cursor pagination

Better for large datasets and infinite scroll — uses an opaque cursor instead of a page number:

\`\`\`ts
@Get()
async list(@Query('cursor') cursor?: string, @Query('limit') limit = '20') {
  const take = Math.min(+limit, 100);
  const where = cursor ? { id: LessThan(+cursor) } : {};
  const rows = await this.repo.find({
    where, take, order: { id: 'DESC' },
  });
  const next = rows.length === take ? String(rows[rows.length - 1].id) : null;
  return { items: rows, nextCursor: next };
}
\`\`\`

## Filtering and sorting

\`\`\`ts
@Get()
list(@Query() q: ListQueryDto) {
  return this.service.list(q);
}

export class ListQueryDto {
  @IsOptional() @IsString()  search?: string;
  @IsOptional() @IsIn(['title','createdAt']) sortBy?: string;
  @IsOptional() @IsIn(['asc','desc']) sortDir?: 'asc' | 'desc';
}
\`\`\`

## Search

For small datasets, a SQL \`ILIKE '%term%'\` is fine. For real search, index with PostgreSQL full-text search or hand off to Elasticsearch / Meilisearch.

## Reusable utility

Build a generic \`paginate(repo, dto)\` helper so every resource gets the same shape: \`{ items, total, page, pageCount }\`.

## Assignment

Add paginated, filterable, searchable \`/posts\` and \`/comments\` endpoints. Benchmark cursor vs offset at 1M rows and write up the result.`;

const m2l5 = `## Lesson Objective

Add structured logging, request tracing, and basic monitoring so production incidents are debuggable instead of mysterious.

## The built-in Logger

\`\`\`ts
@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  async place(order: CreateOrderDto) {
    this.logger.log(\`Placing order for user \${order.userId}\`);
    try {
      // ...
    } catch (err) {
      this.logger.error('Order failed', err.stack);
      throw err;
    }
  }
}
\`\`\`

## Request logging middleware

\`\`\`ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      this.logger.log(
        \`\${req.method} \${req.originalUrl} \${res.statusCode} \${Date.now() - start}ms\`,
      );
    });
    next();
  }
}
\`\`\`

## Request tracing with correlation IDs

Every incoming request gets a UUID; every downstream log line includes it. When something breaks at 3 AM you grep one ID and see the entire request:

\`\`\`ts
app.use((req, _res, next) => {
  req.headers['x-request-id'] ??= randomUUID();
  next();
});
\`\`\`

## Pino for structured JSON logs

Plain text is unsearchable. JSON logs let Datadog, Loki, or CloudWatch index every field:

\`\`\`bash
npm install nestjs-pino pino-http
\`\`\`

\`\`\`ts
@Module({ imports: [LoggerModule.forRoot()] })
export class AppModule {}
\`\`\`

## What to log (and what not to)

- ✅ Request method, path, status, duration, user id, request id
- ✅ Domain events: "order placed", "payment refunded"
- ❌ Passwords, tokens, full credit card numbers, PII
- ❌ "Entering function X" — useless noise

## Health checks

\`@nestjs/terminus\` exposes \`/health\` returning DB, Redis, and external service status — used by load balancers and Kubernetes.

## Assignment

Wire structured JSON logging with a correlation ID, add a \`/health\` endpoint, and ship a Grafana/Datadog dashboard with request rate, error rate, p95 latency.`;


const m3l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the fundamentals of JSON Web Tokens (JWT)
- Implement a secure authentication system with Passport.js
- Protect routes using NestJS Guards
- Learn how to manage user sessions professionally

[video:GHTA143_b-s]

## Why JWT?

In traditional web apps, sessions were stored on the server. In modern, distributed backend systems, we use **JWT (JSON Web Tokens)**. 

### Benefits of JWT:
- **Stateless:** The server doesn't need to store session data.
- **Scalable:** Works perfectly with microservices and load balancers.
- **Secure:** Tokens are digitally signed and can't be tampered with.

## How JWT Works

1. User logs in with credentials.
2. Server validates and returns a signed **JWT**.
3. Client stores the token (usually in LocalStorage or Cookies).
4. Client sends the token in the \`Authorization\` header for every request.
5. Server verifies the signature and grants access.

> [!TIP]
> **Pro Tip:** Always use \`HttpOnly\` cookies to store JWTs if your frontend and backend share the same domain. This prevents XSS attacks from stealing the token.

## Implementing Auth Guards

Guards determine whether a request should be handled by a route or not.

\`\`\`ts
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
\`\`\`

## Password Hashing

Never store passwords in plain text! Use **bcrypt** to hash passwords before saving them to the database.

\`\`\`ts
const hashedPassword = await bcrypt.hash(password, 10);
\`\`\`

> [!CAUTION]
> **Common Pitfall:** Don't use a salt rounds value higher than 12 unless you have a very specific reason. Higher values make hashing exponentially slower, which can lead to DoS attacks on your login endpoint.

## Quick Knowledge Check

- What does a JWT actually contain, and why is the signature critical?
- Where should access tokens vs refresh tokens be stored on the client?
- Why is \`bcrypt\`/\`argon2\` preferred over a plain SHA-256 of the password?

## Assignment

Add JWT auth to your API: signup + login endpoints, an \`AuthGuard\`, a protected \`/me\` route, and an integration test that proves a tampered token is rejected.

## Lesson Outro

Security is a journey, not a destination. You now have a solid foundation for securing your NestJS APIs. Next, we'll look at **Role-Based Access Control (RBAC)** to manage *what* authenticated users can do.`;

const m3l2 = `## Lesson Objective

Add role-based authorization on top of authentication using a custom \`Roles\` decorator and a \`RolesGuard\`.

## Guards are how Nest does authorization

The book describes a \`CheckLoggedInUserGuard\` that only allows a user to access their own data. Guards run **after** middleware and **before** pipes, and they have access to the \`ExecutionContext\` so they know exactly what is being evaluated.

## Roles decorator

\`\`\`ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
\`\`\`

## Roles guard

\`\`\`ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required) return true;
    const { user } = ctx.switchToHttp().getRequest();
    return required.some((r) => user.roles?.includes(r));
  }
}
\`\`\`

## Using it

\`\`\`ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Delete('users/:id')
remove(@Param('id') id: string) {
  return this.users.remove(+id);
}
\`\`\`

## Resource-level ownership

Roles aren't enough on their own. A "user" role shouldn't be able to delete *another* user's post. Combine role checks with ownership checks — exactly like the book's \`CheckLoggedInUserGuard\`:

\`\`\`ts
canActivate(ctx: ExecutionContext) {
  const req = ctx.switchToHttp().getRequest();
  return Number(req.params.userId) === req.user.id;
}
\`\`\`

## Hierarchical roles

\`\`\`ts
const hierarchy = { admin: 3, editor: 2, user: 1 };
const has = (userRole, needed) => hierarchy[userRole] >= hierarchy[needed];
\`\`\`

## Assignment

Implement \`admin\`, \`editor\`, \`user\` roles. Admin manages users, editor manages posts, user can only edit their own posts. Write a guard for each rule and an integration test that proves it.`;

const m3l3 = `## Lesson Objective

Never store plaintext passwords. Use bcrypt correctly, manage secrets through environment variables, and design a credential layer that survives a database breach.

## Hashing with bcrypt

\`\`\`ts
const SALT_ROUNDS = 12;

@Injectable()
export class PasswordService {
  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT_ROUNDS);
  }

  verify(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
\`\`\`

Why bcrypt: it's slow on purpose. 12 rounds takes ~250ms — fine for a login, deadly for an attacker trying to crack a million stolen hashes.

## Argon2 — the modern alternative

\`\`\`bash
npm install argon2
\`\`\`

\`\`\`ts
import * as argon2 from 'argon2';
const hash = await argon2.hash(plain, { type: argon2.argon2id });
const ok = await argon2.verify(hash, plain);
\`\`\`

Argon2id is the current OWASP recommendation. Both bcrypt and Argon2 are acceptable — never use SHA-256 or MD5 for passwords.

## Environment variables

\`\`\`ts
// app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().min(32).required(),
    DATABASE_URL: Joi.string().required(),
  }),
}),
\`\`\`

Never commit \`.env\`. Rotate secrets when a developer leaves. Use a secret manager (AWS Secrets Manager, GCP Secret Manager, Doppler) in production.

## Password rules that actually help

- Minimum 12 characters, no maximum (let users use passphrases)
- Check against the HIBP "Pwned Passwords" list
- Don't force frequent rotation — that pushes users to weaker passwords
- Always offer 2FA

## Account safety

- Rate-limit login attempts per IP and per account
- Send an email on password change
- Invalidate all sessions on password change

## Assignment

Implement signup with bcrypt, login rate limiting (5 attempts / 15 min), and a "compromised password" check during signup. Document your threat model.`;

const m3l4 = `## Lesson Objective

Apply the production API security checklist: CORS, Helmet, rate limiting, input sanitization, and secure headers.

## CORS

\`\`\`ts
app.enableCors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? false,
  credentials: true,
});
\`\`\`

Never use \`origin: '*'\` with \`credentials: true\` — that combination is rejected by browsers and a sign of misconfiguration.

## Helmet

\`\`\`bash
npm install helmet
\`\`\`

\`\`\`ts
import helmet from 'helmet';
app.use(helmet());
\`\`\`

Helmet sets \`Strict-Transport-Security\`, \`X-Content-Type-Options\`, \`X-Frame-Options\`, and a Content Security Policy — turning on a dozen browser protections in one line.

## Rate limiting

\`\`\`bash
npm install @nestjs/throttler
\`\`\`

\`\`\`ts
@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }])],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
\`\`\`

Tighter limits on auth routes:

\`\`\`ts
@Throttle({ default: { limit: 5, ttl: 60_000 } })
@Post('login')
\`\`\`

## Input sanitization

Validation isn't sanitization. For HTML inputs, strip script tags with \`sanitize-html\`. Use parameterized queries through your ORM — never concatenate SQL.

## HTTPS everywhere

Terminate TLS at your reverse proxy (Nginx, Caddy, Cloudflare). Redirect HTTP → HTTPS. Set \`secure: true\` on cookies.

## Secrets in logs

Add a log redactor so tokens, passwords, and PII never end up in log aggregators:

\`\`\`ts
LoggerModule.forRoot({
  pinoHttp: { redact: ['req.headers.authorization', 'res.body.password'] },
}),
\`\`\`

## OWASP Top 10 quick map

Injection → ORM + validation. Broken auth → JWT + bcrypt. Sensitive data exposure → HTTPS + secrets manager. Broken access control → Guards + ownership checks.

## Assignment

Run an audit on your existing API. Submit a checklist of which OWASP Top 10 issue each control mitigates.`;

// ===== Module 4: Scalable Database Systems =====

const m4l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the difference between SQL and NoSQL databases
- Learn the basics of Object-Relational Mapping (ORM)
- Set up a PostgreSQL database for a NestJS project
- Design scalable database schemas

[video:GHTA143_b-s]

## SQL vs NoSQL

Choosing the right database is one of the most important decisions for a backend engineer.

| Feature | SQL (PostgreSQL, MySQL) | NoSQL (MongoDB, Redis) |
|-----------|-------------------------|------------------------|
| **Structure** | Relational, Table-based | Document, Key-Value |
| **Schema** | Predefined, Strict | Dynamic, Flexible |
| **Scaling** | Vertical (better for complex queries) | Horizontal (better for huge datasets) |

## What is an ORM?

An **ORM (Object-Relational Mapper)** allows you to interact with your database using code (TypeScript classes) instead of raw SQL queries.

### Why use an ORM?
- **Type Safety:** Get autocomplete and compile-time checks.
- **Security:** Automatically prevents SQL Injection.
- **Maintainability:** Easier to refactor and migrate.

> [!TIP]
> **Pro Tip:** While ORMs are great, knowing raw SQL is a superpower. Sometimes a complex query is better written in SQL for performance.

## Popular ORMs for NestJS

1. **TypeORM:** The most mature and widely used.
2. **Prisma:** Modern, developer-friendly, and very fast.
3. **Mongoose:** The standard for MongoDB.

## Designing a Schema

A good schema is normalized. This means reducing redundancy and ensuring data integrity.

\`\`\`ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
\`\`\`

> [!CAUTION]
> **Common Pitfall:** Avoid "N+1" query problems by using \`relations\` or \`joins\` properly. Loading 100 users and then doing 100 separate queries for their posts will kill your database performance.

## Lesson Outro

You now understand the storage engine of the internet! Next, we'll get our hands dirty and connect a **PostgreSQL** database to our NestJS app using **TypeORM**.`;

const m4l2 = `## Lesson Objective

Connect Nest.js to PostgreSQL using either TypeORM or Prisma, define entities, and run migrations safely.

## Why PostgreSQL

The book covers TypeORM, Sequelize, and Mongoose as the three main Node ORMs. TypeORM is one of the most mature, with an official \`@nestjs/typeorm\` package and support for **MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, and WebSQL**. Postgres is the default modern choice: ACID, JSONB, full-text search, and battle-tested at every scale.

## TypeORM setup

\`\`\`bash
npm install @nestjs/typeorm typeorm pg
\`\`\`

\`\`\`ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      synchronize: false,    // NEVER true in production
    }),
  ],
})
export class AppModule {}
\`\`\`

## Entity

\`\`\`ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true })  email: string;
  @Column()                  passwordHash: string;
  @CreateDateColumn()        createdAt: Date;
}
\`\`\`

## Using it from a service

\`\`\`ts
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
  create(dto: CreateUserDto)  { return this.repo.save(this.repo.create(dto)); }
}
\`\`\`

## Prisma alternative

\`\`\`bash
npm install prisma --save-dev
npx prisma init
\`\`\`

\`\`\`prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}
\`\`\`

\`\`\`ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() { await this.$connect(); }
}
\`\`\`

## Migrations

\`\`\`bash
# TypeORM
typeorm migration:generate src/migrations/AddUsers
typeorm migration:run

# Prisma
npx prisma migrate dev --name add_users
\`\`\`

Never use \`synchronize: true\` in production — it can silently drop columns.

## Assignment

Add a \`User\` and \`Post\` entity with a one-to-many relationship. Write a migration. Seed three users and ten posts. Confirm the schema with \`psql\\dt\`.`;

const m4l3 = `## Lesson Objective

Master relations, transactions, the repository pattern, and query optimization — the differences between a junior and senior ORM user.

## Relations

\`\`\`ts
@Entity()
export class Post {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @ManyToOne(() => User, (u) => u.posts) author: User;
  @OneToMany(() => Comment, (c) => c.post) comments: Comment[];
}
\`\`\`

## Eager vs lazy loading

Default to **lazy** — load relations only when you need them. Eager loading is convenient and turns into N+1 queries the moment your data grows.

\`\`\`ts
// Good: explicit join, one query
this.posts.find({ relations: ['author'], take: 20 });
\`\`\`

## Transactions

The book uses Sequelize's transaction pattern for the \`User\` service. The same idea in TypeORM:

\`\`\`ts
await this.dataSource.transaction(async (tx) => {
  const user = await tx.getRepository(User).save({ email });
  await tx.getRepository(Wallet).save({ userId: user.id, balance: 0 });
});
\`\`\`

If the second insert fails, the first is rolled back automatically.

## Repository pattern

Wrap data access in a domain repository so services depend on the *contract*, not the ORM:

\`\`\`ts
export abstract class UsersRepo {
  abstract findByEmail(email: string): Promise<User | null>;
}

@Injectable()
export class TypeOrmUsersRepo extends UsersRepo {
  constructor(@InjectRepository(User) private repo: Repository<User>) { super(); }
  findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
}
\`\`\`

Now swapping TypeORM for Prisma is one binding change.

## Query optimization

- **Watch N+1**: log SQL in dev, count queries per endpoint
- **Index** every column in a \`WHERE\` or \`ORDER BY\`
- **Select only what you need** (\`select: ['id','email']\`)
- **Paginate** every list endpoint
- Use \`EXPLAIN ANALYZE\` to see the real query plan

## Assignment

Find one endpoint in your app that runs more than 3 queries. Refactor it to run exactly one query using a proper join. Measure before/after with \`EXPLAIN ANALYZE\`.`;

const m4l4 = `## Lesson Objective

Add Redis caching to your Nest app to reduce database load and shave hundreds of milliseconds off response times.

## What Redis is

An in-memory key-value store. Reads and writes complete in sub-millisecond time. Use it for caches, sessions, rate limits, pub/sub, and queues.

## Setup

\`\`\`bash
npm install @nestjs/cache-manager cache-manager cache-manager-redis-yet
\`\`\`

\`\`\`ts
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({ url: process.env.REDIS_URL }),
        ttl: 60_000,
      }),
    }),
  ],
})
export class AppModule {}
\`\`\`

## Cache an endpoint

\`\`\`ts
@UseInterceptors(CacheInterceptor)
@CacheTTL(30_000)
@Get('popular')
findPopular() {
  return this.posts.findPopular(); // expensive query
}
\`\`\`

## Manual cache for complex keys

\`\`\`ts
@Injectable()
export class PostsService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async findById(id: number) {
    const key = \`post:\${id}\`;
    const cached = await this.cache.get<Post>(key);
    if (cached) return cached;
    const post = await this.repo.findOneBy({ id });
    if (post) await this.cache.set(key, post, 60_000);
    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    const updated = await this.repo.save({ id, ...dto });
    await this.cache.del(\`post:\${id}\`); // invalidate
    return updated;
  }
}
\`\`\`

## Cache invalidation strategies

- **TTL** — easiest, accept eventual consistency (a few seconds stale)
- **Write-through** — write to cache and DB on every update
- **Cache-aside** — delete the cache key on writes (shown above)

The hardest problem in computer science is naming things; the second is cache invalidation. Pick a strategy per resource and document it.

## What to cache

- Read-heavy, slow queries (popular posts, feed pages)
- Session data
- Rate-limit counters
- Anything you can rebuild from the database

## What never to cache

- Per-user sensitive data with the same key
- Anything that must be strongly consistent (balances, inventory at checkout)

## Assignment

Add Redis caching to your hottest endpoint. Measure p95 latency before/after with a load test.`;

// ===== Module 5: Microservices =====

const m5l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the core principles of Microservices Architecture
- Learn about different communication styles (Synchronous vs Asynchronous)
- Understand the role of an API Gateway
- Learn when to transition from Monolith to Microservices

[video:0p69fJqR38k]

## What are Microservices?

Microservices are an architectural style that structures an application as a collection of services that are:
- **Independently deployable**
- **Loosely coupled**
- **Organized around business capabilities**
- **Owned by small teams**

## Communication Patterns

### Synchronous (Request/Response)
- **HTTP / REST**
- **gRPC**
- Use when you need an immediate answer (e.g., checking if a user exists).

### Asynchronous (Event-Driven)
- **Message Queues (RabbitMQ, Kafka)**
- **Pub/Sub (Redis)**
- Use when you don't need an immediate answer (e.g., sending an email after signup).

> [!TIP]
> **Pro Tip:** In a professional microservices environment, aim for **Event-Driven Architecture** as much as possible. This reduces coupling and makes your system more resilient.

## The API Gateway Pattern

The API Gateway is the single entry point for all clients. It handles:
- **Routing**
- **Authentication**
- **Rate Limiting**
- **Load Balancing**

> [!CAUTION]
> **Common Pitfall:** Don't turn your API Gateway into a "Monolithic Gateway" by putting business logic in it. It should stay thin and only handle cross-cutting concerns.

## Lesson Outro

Microservices offer incredible scalability, but they come with significant complexity. You now understand the trade-offs. Next, we'll build our very first **NestJS Microservice** using the built-in TCP transporter.`;

const m5l2 = `## Lesson Objective

Build your first Nest microservice using TCP transport — producer and consumer in the same repo.

## Generate a microservice

\`\`\`bash
nest new orders-service
npm install @nestjs/microservices
\`\`\`

## Bootstrapping a TCP microservice

\`\`\`ts
// orders-service/src/main.ts
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { transport: Transport.TCP, options: { host: '0.0.0.0', port: 3001 } },
  );
  await app.listen();
}
bootstrap();
\`\`\`

## Message-pattern handler

\`\`\`ts
@Controller()
export class OrdersController {
  @MessagePattern({ cmd: 'create-order' })
  create(@Payload() dto: CreateOrderDto) {
    return this.orders.create(dto);
  }

  @MessagePattern({ cmd: 'list-orders' })
  list(@Payload() userId: number) {
    return this.orders.listFor(userId);
  }
}
\`\`\`

## Calling it from the HTTP API gateway

\`\`\`ts
@Module({
  imports: [
    ClientsModule.register([{
      name: 'ORDERS_SERVICE',
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3001 },
    }]),
  ],
})
export class GatewayModule {}

@Controller('orders')
export class OrdersGateway {
  constructor(@Inject('ORDERS_SERVICE') private client: ClientProxy) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.client.send({ cmd: 'create-order' }, dto);
  }
}
\`\`\`

The client returns an Observable; Nest converts it to a Promise/JSON for the HTTP response automatically.

## Hybrid apps

You can run **HTTP and microservice listeners side-by-side** in one process — useful when you're still pulling features out of a monolith:

\`\`\`ts
const app = await NestFactory.create(AppModule);
app.connectMicroservice({ transport: Transport.TCP, options: { port: 3001 } });
await app.startAllMicroservices();
await app.listen(3000);
\`\`\`

## Assignment

Split your existing CRUD into two processes: an HTTP gateway and a TCP service. Confirm the gateway can call \`create\`, \`list\`, \`update\`, \`delete\` over TCP.`;

const m5l3 = `## Lesson Objective

Move from synchronous request/response to event-driven architecture using \`@EventPattern\` and pub/sub.

## Events vs commands

- **Command** — "create this order" — caller expects a reply
- **Event** — "order created" — caller doesn't care who listens

Events are the foundation of decoupling. The orders service emits \`order.created\`. The email service listens and sends a receipt. Analytics listens and records the conversion. Inventory listens and decrements stock. None of them know about each other.

## Emit an event

\`\`\`ts
@Injectable()
export class OrdersService {
  constructor(@Inject('EVENTS') private bus: ClientProxy) {}

  async create(dto: CreateOrderDto) {
    const order = await this.repo.save(dto);
    this.bus.emit('order.created', order);
    return order;
  }
}
\`\`\`

## Subscribe to an event

\`\`\`ts
@Controller()
export class EmailListener {
  @EventPattern('order.created')
  async handleOrderCreated(@Payload() order: Order) {
    await this.mailer.sendReceipt(order);
  }
}
\`\`\`

## In-process events with EventEmitter2

For a single-process app, you don't need a broker:

\`\`\`bash
npm install @nestjs/event-emitter
\`\`\`

\`\`\`ts
this.events.emit('order.created', order);

@OnEvent('order.created')
handle(order: Order) { /* ... */ }
\`\`\`

## Cross-process events with Redis pub/sub

\`\`\`ts
ClientsModule.register([{
  name: 'EVENTS',
  transport: Transport.REDIS,
  options: { host: 'redis', port: 6379 },
}]),
\`\`\`

## Event sourcing in one paragraph

Instead of storing the *current state* of an order, store the **sequence of events** that produced it: \`order.placed\`, \`payment.captured\`, \`order.shipped\`. The current state is a fold over the event log. Powerful, but complex — don't adopt it until you need full audit history or temporal queries.

## Designing good events

- Past tense: \`order.created\`, not \`create.order\`
- Include all data subscribers need — they shouldn't have to call back
- Include a version: \`{ version: 1, ...payload }\`
- Make handlers **idempotent** — the same event may arrive twice

## Assignment

Refactor your "send welcome email on signup" code into an event. Add a second subscriber that records the signup in an analytics table.`;

const m5l4 = `## Lesson Objective

Build an API Gateway that fronts multiple microservices, centralizes authentication, and aggregates calls.

## What an API Gateway does

- One public URL for clients
- Authentication and rate limiting happen here, once
- Request routing to the right service
- Response aggregation across services
- Versioning and protocol translation (HTTP → TCP/gRPC/AMQP)

## Topology

\`\`\`text
Client → Gateway (HTTP, public)
            ├─ TCP → Auth Service
            ├─ TCP → Orders Service
            ├─ TCP → Catalog Service
            └─ Redis → Notifications Service
\`\`\`

## Implementation

\`\`\`ts
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersGateway {
  constructor(
    @Inject('ORDERS')  private orders:  ClientProxy,
    @Inject('CATALOG') private catalog: ClientProxy,
  ) {}

  @Get(':id')
  async show(@Param('id') id: string) {
    const order = await firstValueFrom(this.orders.send({ cmd: 'get-order' }, +id));
    const items = await firstValueFrom(
      this.catalog.send({ cmd: 'get-products' }, order.itemIds),
    );
    return { ...order, items };
  }
}
\`\`\`

## Aggregation in parallel

Use \`Promise.all\` / \`forkJoin\` so two downstream calls don't serialize:

\`\`\`ts
const [order, items] = await Promise.all([
  firstValueFrom(this.orders.send({ cmd: 'get-order' }, +id)),
  firstValueFrom(this.catalog.send({ cmd: 'get-products' }, ids)),
]);
\`\`\`

## Cross-cutting concerns

Put these on the gateway, not in every service:

- JWT verification + user context propagation (\`x-user-id\` header)
- Rate limiting with \`@nestjs/throttler\`
- Request logging with a correlation id
- CORS, Helmet, response compression
- API versioning (\`/v1\`, \`/v2\`)

## What not to do

- Don't put business logic in the gateway — keep it dumb
- Don't make the gateway a single point of failure — run multiple replicas
- Don't aggregate everything — sometimes the client should call two endpoints

## Assignment

Add a gateway in front of two of your microservices. Implement a single aggregated \`GET /me/dashboard\` endpoint that fans out to user + orders + notifications and merges the result.`;

const m5l5 = `## Lesson Objective

Use RabbitMQ for durable, retryable message delivery between services — with dead-letter queues for poison messages.

## Why RabbitMQ over Redis pub/sub

Redis pub/sub is fire-and-forget — if no consumer is online, the message is lost. RabbitMQ stores messages, retries failed deliveries, supports priorities, dead-letters, and acknowledgements.

## Setup

\`\`\`bash
npm install @nestjs/microservices amqplib amqp-connection-manager
\`\`\`

\`\`\`ts
// consumer (orders service)
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'orders_queue',
    queueOptions: { durable: true },
    noAck: false,
  },
});
\`\`\`

## Producer

\`\`\`ts
ClientsModule.register([{
  name: 'ORDERS',
  transport: Transport.RMQ,
  options: { urls: [url], queue: 'orders_queue', queueOptions: { durable: true } },
}]),

this.orders.emit('order.created', payload);
\`\`\`

## Manual acknowledgement

\`\`\`ts
@EventPattern('order.created')
async handle(@Payload() data: Order, @Ctx() ctx: RmqContext) {
  const channel = ctx.getChannelRef();
  const original = ctx.getMessage();
  try {
    await this.process(data);
    channel.ack(original);
  } catch (err) {
    channel.nack(original, false, false); // → DLQ
  }
}
\`\`\`

\`noAck: false\` + explicit \`ack\` means: if your service crashes mid-processing, RabbitMQ re-delivers to another consumer.

## Retry and dead-letter queues

Configure the queue with a DLX (dead-letter exchange) and a retry-with-delay queue:

\`\`\`text
orders_queue (TTL=30s, DLX → orders_retry)
orders_retry (TTL=30s, DLX → orders_queue)   ← bounce back, exponential backoff
orders_dlq    ← after N retries, parked here for inspection
\`\`\`

## Idempotency

Every handler should be safe to run twice for the same message — store a \`processed_events(event_id)\` table and skip if seen.

## When to use what

- **In-process event emitter** — same Nest app
- **Redis pub/sub** — low-latency notifications, OK to lose
- **RabbitMQ** — must-deliver work, retries, fan-out
- **Kafka** — high-throughput logs, replayable history

## Assignment

Move "send welcome email" to a RabbitMQ-backed queue with a DLQ. Crash the consumer mid-job — confirm the message is redelivered and not lost.`;

// ===== Module 6: Performance with Queues & Caching =====

const m6l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the concept of Background Jobs and Task Queues
- Learn how to offload heavy tasks to keep your API responsive
- Implement a task queue using BullMQ and Redis
- Learn about retries, backoffs, and job prioritization

[video:Jm3X1r8qFm4]

## Why use Background Jobs?

Imagine a user signs up. You need to:
1. Save user to database (Fast)
2. Send a welcome email (Slow)
3. Notify the marketing team (Slow)
4. Generate an initial profile avatar (Slow)

If you do all this in the request-response cycle, the user will be waiting for seconds. With background jobs, you do step 1 and immediately return "Success!". Steps 2, 3, and 4 happen in the background.

## Introduction to BullMQ

**BullMQ** is the most popular, fast, and reliable Redis-based queue for Node.js. NestJS has a first-class integration for it.

### Key Concepts:
- **Producer:** The part of your code that adds jobs to the queue.
- **Consumer (Worker):** The part of your code that processes the jobs.
- **Queue:** The Redis-backed storage where jobs wait.

> [!TIP]
> **Pro Tip:** Always set up **Retries** and **Exponential Backoff**. If an email service is down temporarily, BullMQ will automatically try again after a few minutes instead of just failing.

## Implementing a Simple Queue

\`\`\`ts
@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async transcode(file: string) {
    await this.audioQueue.add('transcode', {
      file: file,
    });
    return user;
  }
}
\`\`\`

## Worker

\`\`\`ts
@Processor('emails')
export class EmailsProcessor extends WorkerHost {
  async process(job: Job) {
    if (job.name === 'welcome') {
      await this.mailer.sendWelcome(job.data.userId);
    }
  }
}
\`\`\`

Workers can run in the same process or — better — as their own deployable (\`npm run start:worker\`) so you can scale them independently.

## Delayed and recurring jobs

\`\`\`ts
// 1 hour from now
queue.add('reminder', { id }, { delay: 3_600_000 });

// every weekday at 9am
queue.add('digest', {}, { repeat: { pattern: '0 9 * * 1-5' } });
\`\`\`

## Job priorities

\`\`\`ts
queue.add('password-reset', payload, { priority: 1 });   // urgent
queue.add('analytics-sync', payload, { priority: 10 });  // background
\`\`\`

## Observability

Add \`bull-board\` for a live UI showing waiting / active / completed / failed jobs.

## Assignment

Convert three slow endpoints to background jobs. Add a worker process. Confirm p95 latency on those endpoints drops below 100ms.`;

const m6l2 = `## Lesson Objective

Build a robust notification system — email, SMS, push — that survives provider outages and retries automatically.

## Architecture

\`\`\`text
App → emit 'notify.send' → notifications queue → workers → SendGrid / Twilio / FCM
                                                       ↓ on failure
                                                  retry with backoff → DLQ
\`\`\`

The application **never** calls SendGrid directly — it only emits an event. If SendGrid is down for 10 minutes, the queue buffers; nothing is lost.

## A unified notifier

\`\`\`ts
export type Notification =
  | { channel: 'email'; to: string; template: string; data: any }
  | { channel: 'sms';   to: string; template: string; data: any }
  | { channel: 'push';  userId: number; template: string; data: any };

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('notifications') private q: Queue) {}
  send(n: Notification) {
    return this.q.add('send', n, { attempts: 5, backoff: { type: 'exponential', delay: 10_000 } });
  }
}
\`\`\`

## Provider abstraction

\`\`\`ts
export abstract class EmailProvider {
  abstract send(to: string, subject: string, html: string): Promise<void>;
}

@Injectable()
export class SendGridProvider extends EmailProvider { /* ... */ }
@Injectable()
export class PostmarkProvider extends EmailProvider { /* ... */ }
\`\`\`

If SendGrid raises prices or fails, swap the binding — your business code doesn't change.

## Templating

Use Handlebars or MJML for HTML emails. Store templates in your repo (\`templates/welcome.hbs\`), render with the recipient's data inside the worker.

## User preferences

Every user should be able to opt out by channel and category (transactional vs marketing). Check \`notification_preferences\` before sending — and never send marketing to users who didn't opt in.

## Tracking

Log: queued, sent, delivered, opened, bounced. SendGrid/Postmark webhooks push these events back — store them so you can answer "did the user receive the password reset?"

## Assignment

Build a notification system with email + SMS providers, opt-out preferences, and a webhook endpoint that records delivery status.`;

const m6l3 = `## Lesson Objective

Use Redis beyond simple caching — distributed locks, rate limiting, session storage, and pub/sub at scale.

## Distributed rate limiting

\`@nestjs/throttler\` defaults to memory storage. Across multiple Node processes that breaks — each instance has its own counter. Use a Redis storage adapter so the limit is global:

\`\`\`ts
ThrottlerModule.forRootAsync({
  useFactory: () => ({
    throttlers: [{ ttl: 60_000, limit: 100 }],
    storage: new ThrottlerStorageRedisService(redisClient),
  }),
}),
\`\`\`

## Session storage

Don't store sessions in memory or in JWTs you can't revoke. Store them in Redis with a TTL:

\`\`\`ts
await redis.set(\`session:\${id}\`, JSON.stringify(data), 'EX', 3600);
\`\`\`

Logout = \`redis.del('session:' + id)\`. Force-logout-all-users = \`redis.flushdb()\` on the sessions DB.

## Distributed locks (Redlock)

When two workers might process the same job, wrap the critical section in a lock:

\`\`\`ts
import Redlock from 'redlock';
const redlock = new Redlock([redis]);

const lock = await redlock.acquire(['lock:invoice:42'], 5000);
try { /* exclusive section */ } finally { await lock.release(); }
\`\`\`

## Idempotency keys

Clients send \`Idempotency-Key: <uuid>\`. Server stores the result in Redis for 24h. Duplicate requests return the cached response — safe retries for POST.

## Pub/sub at scale

For ephemeral fan-out (live dashboards, chat presence), Redis pub/sub is perfect: sub-millisecond delivery, zero persistence. Pair with WebSockets:

\`\`\`ts
redisSub.subscribe('prices');
redisSub.on('message', (_ch, msg) => this.io.emit('price', JSON.parse(msg)));
\`\`\`

## Sorted sets for leaderboards

\`\`\`ts
await redis.zadd('leaderboard', score, userId);
await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES'); // top 10
\`\`\`

A million users, sub-millisecond top-N.

## Memory and eviction

Set \`maxmemory\` + \`maxmemory-policy allkeys-lru\` in production. Monitor hit ratio — anything under 80% on a hot cache means your TTLs are wrong.

## Assignment

Add distributed rate limiting, idempotency keys on \`POST /payments\`, and a Redis-backed leaderboard endpoint. Run a 2-instance deployment and verify limits are enforced globally.`;

const m6l4 = `## Lesson Objective

Profile, identify, and fix the real bottlenecks in a Nest.js application — database, CPU, or network.

## Measure first

You cannot optimize what you do not measure. Three signals matter:

1. **p95 / p99 latency** per endpoint
2. **Database query count** per request
3. **CPU and memory** per process

Tools: \`autocannon\` for load tests, \`clinic.js\` for Node profiling, \`pg_stat_statements\` for slow queries, Datadog/Grafana for production.

## The 80/20 of Nest performance

In nearly every Nest app, the bottleneck is the **database**, not Node. Optimize in this order:

1. **Add the missing index** — one index can be 100× faster than any code change
2. **Fix N+1 queries** — one join replaces 50 queries
3. **Paginate** — never return unbounded lists
4. **Cache** the slow read-mostly queries in Redis
5. **Offload** slow work to background jobs
6. *Then* think about Node performance

## EXPLAIN ANALYZE

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM posts WHERE user_id = 42 ORDER BY created_at DESC LIMIT 20;
\`\`\`

If you see "Seq Scan" on a million-row table, you need an index on \`(user_id, created_at)\`.

## Connection pooling

Postgres defaults to ~100 connections. Each Node instance with TypeORM should use a pool of ~10. Beyond that, put PgBouncer in front — running out of DB connections is the single most common production outage in Node shops.

## Node-side optimizations

- Run multiple processes with PM2 / cluster mode (or, better, run multiple Docker replicas)
- Use \`--max-old-space-size\` to set heap limits
- Stream large responses with \`StreamableFile\` instead of loading into memory
- Avoid sync I/O (\`readFileSync\`) in request handlers

## A performance budget

Write down your targets:

- p95 < 200ms on all GET endpoints
- < 5 SQL queries per request
- < 250MB heap per process

Treat regressions like bugs. Run load tests in CI.

## Assignment

Profile your slowest endpoint. Find the dominant cost (DB, CPU, network). Fix it. Document before/after p95 with screenshots from the load test.`;

// ===== Module 7: Testing =====

const m7l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the "Testing Pyramid" and where NestJS fits in
- Learn the difference between Unit, Integration, and E2E tests
- Set up a testing environment with Jest
- Write your first automated test in NestJS

[video:jOytv6PQxN0]

## Why Automated Testing?

Testing isn't just about finding bugs. It's about **confidence**. 
- Can I refactor this code without breaking everything? **Yes.**
- Can I ship this new feature safely? **Yes.**
- Does the app still work after I updated my dependencies? **Yes.**

## The Testing Pyramid

1. **Unit Tests (The Base):** Test small, isolated pieces of code (like a single function or service method). Fast and cheap.
2. **Integration Tests (The Middle):** Test how different parts of your system work together (e.g., Service + Database).
3. **E2E Tests (The Top):** Test the entire application from the user's perspective. Slow and expensive, but high confidence.

> [!TIP]
> **Pro Tip:** Aim for high coverage in Unit Tests, but don't ignore E2E tests. A "green" unit test doesn't matter if your database connection is broken!

## Introduction to Jest

**Jest** is the standard testing framework for NestJS. It's fast, has great documentation, and includes everything you need (assertions, mocks, coverage reports).

### Anatomy of a Test:
\`\`\`ts
describe('UsersService', () => {
  it('should return a user by ID', () => {
    // 1. Arrange (Set up the test)
    // 2. Act (Call the method)
    // 3. Assert (Check the result)
  });
});
\`\`\`

> [!CAUTION]
> **Common Pitfall:** Don't test "implementation details." Test **behavior**. If you change the internal logic of a function but the output stays the same, your tests shouldn't break.

## Lesson Outro

You've just taken the first step toward becoming a professional, reliable engineer! Next, we'll write our first **Unit Test** for a NestJS service.`;

const m7l2 = `## Lesson Objective

Write unit tests for Nest providers using \`@nestjs/testing\`, mock dependencies cleanly, and run them in under a second.

## The testing module

\`\`\`ts
describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: createMock<Repository<User>>() },
      ],
    }).compile();

    service = module.get(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('finds a user by email', async () => {
    repo.findOne.mockResolvedValue({ id: 1, email: 'a@b.c' } as User);

    const user = await service.findByEmail('a@b.c');

    expect(user).toMatchObject({ id: 1 });
    expect(repo.findOne).toHaveBeenCalledWith({ where: { email: 'a@b.c' } });
  });

  it('returns null when missing', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findByEmail('x@y.z')).resolves.toBeNull();
  });
});
\`\`\`

## Mocking strategies

- **\`useValue\`** — a fixed object
- **\`useFactory\`** — built per test
- **\`createMock\` from @golevelup/ts-jest** — deep mock with type safety
- **\`jest.spyOn\`** — for methods you don't want to fully mock

## Testing controllers

\`\`\`ts
it('GET /users returns list', async () => {
  const usersSvc = { findAll: jest.fn().mockResolvedValue([{ id: 1 }]) };
  const module = await Test.createTestingModule({
    controllers: [UsersController],
    providers: [{ provide: UsersService, useValue: usersSvc }],
  }).compile();

  const ctrl = module.get(UsersController);
  expect(await ctrl.findAll()).toEqual([{ id: 1 }]);
});
\`\`\`

## Tips that save hours

- Run with \`--watch\` while you code
- Use \`--coverage\` only in CI — slow on every save
- \`jest.resetAllMocks()\` in \`afterEach\` — stale mocks cause confusing failures
- Don't test \`Logger\`, don't test \`bcrypt\` — test *your* code

## Assignment

Write unit tests for your auth service: \`validateUser\` happy path, wrong password, missing user. Add tests for token signing with a frozen clock (\`jest.useFakeTimers()\`).`;

const m7l3 = `## Lesson Objective

Write integration tests that spin up real Nest modules talking to a real database — catching bugs unit tests miss.

## Unit vs integration

A unit test mocks the repository. An integration test uses a **real database** (often Postgres in Docker) so you also test the SQL, the migrations, and the mapping layer.

## Test database setup

\`\`\`ts
let app: INestApplication;
let dataSource: DataSource;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.TEST_DATABASE_URL,
        entities: [User, Post],
        synchronize: true,
        dropSchema: true,
      }),
      UsersModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();
  dataSource = module.get(DataSource);
});

afterAll(async () => {
  await app.close();
});

afterEach(async () => {
  await dataSource.synchronize(true); // truncate between tests
});
\`\`\`

## Run Postgres in Docker, just for tests

\`\`\`yaml
# docker-compose.test.yml
services:
  pg-test:
    image: postgres:16
    environment: { POSTGRES_PASSWORD: test }
    ports: ['5433:5432']
\`\`\`

\`\`\`bash
docker compose -f docker-compose.test.yml up -d
TEST_DATABASE_URL=postgres://postgres:test@localhost:5433/postgres npm run test
\`\`\`

## Test data seeding

Use factory functions, not fixtures:

\`\`\`ts
const userFactory = (overrides?: Partial<User>) =>
  repo.save({ email: \`u\${Date.now()}@x.io\`, passwordHash: 'x', ...overrides });
\`\`\`

Factories make each test independent — no shared fixture file to keep in sync.

## What to actually test at this layer

- Repository methods do the right SQL
- Migrations run cleanly forward and backward
- Unique constraints reject duplicates
- Transactions roll back on errors
- ORM mapping handles nullable / default / enum columns

## Assignment

Add integration tests for your users module that prove: signup creates a row, duplicate email returns 409, soft-delete preserves the row but excludes from \`findAll\`.`;

const m7l4 = `## Lesson Objective

Write end-to-end tests with Supertest that drive your real HTTP API — auth, validation, error paths, the lot.

## The book's recommendation

Nest's E2E story uses **Jest** plus **\`supertest\`** to simulate HTTP requests against the running app. The \`@nestjs/testing\` package wires this up cleanly.

## Anatomy of an E2E test

\`\`\`ts
import * as request from 'supertest';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(() => app.close());

  it('signs up and logs in', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'a@b.c', password: 'CorrectHorseBatteryStaple' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a@b.c', password: 'CorrectHorseBatteryStaple' })
      .expect(200);

    expect(res.body.access_token).toBeDefined();
  });

  it('rejects wrong password', () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a@b.c', password: 'wrong' })
      .expect(401));
});
\`\`\`

## Authenticated flows

\`\`\`ts
const { body } = await request(server).post('/auth/login').send(creds);
const token = body.access_token;

await request(server)
  .get('/me')
  .set('Authorization', \`Bearer \${token}\`)
  .expect(200);
\`\`\`

## What to test E2E

- The **5 golden paths** of your product (signup, login, create primary resource, etc.)
- Critical error paths (401, 403, 422)
- Payment / money-related flows — every time

## What NOT to test E2E

- Every CRUD permutation — that's what unit tests are for
- Library behaviour
- Anything that takes more than 30 seconds — bring it down to integration

## Performance

E2E tests are slow. Keep the suite under 2 minutes by sharing the app instance across tests in the same file and using a single test DB transaction that rolls back.

## Assignment

Write E2E tests covering signup, login, create-post, comment-on-post, delete-post-as-owner, delete-post-as-non-owner (expect 403).`;

const m7l5 = `## Lesson Objective

Wire your test suite into GitHub Actions so every PR is automatically built, tested, and gated on coverage.

## Why CI matters

Tests that don't run on every PR rot. CI is the only way to keep a green main branch in a team larger than one.

## A GitHub Actions workflow

\`\`\`yaml
# .github/workflows/ci.yml
name: CI
on:
  push: { branches: [main] }
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_PASSWORD: test }
        ports: ['5432:5432']
        options: --health-cmd pg_isready
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --coverage
        env:
          TEST_DATABASE_URL: postgres://postgres:test@localhost:5432/postgres
      - run: npm run test:e2e
      - uses: codecov/codecov-action@v4
\`\`\`

## Coverage gates

\`\`\`json
// package.json — Jest config
"coverageThreshold": {
  "global": { "branches": 80, "functions": 80, "lines": 80, "statements": 80 }
}
\`\`\`

If a PR drops coverage below 80%, the build fails. Pick the number your team will actually defend.

## Required checks

In GitHub branch protection, require \`test\` to pass before merging. No green check, no merge.

## Deploy on green

\`\`\`yaml
deploy:
  needs: test
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - run: ./scripts/deploy.sh
\`\`\`

Every merge to \`main\` triggers a deploy — only if tests are green.

## Parallel and matrix

Split tests across shards and Node versions:

\`\`\`yaml
strategy:
  matrix:
    node: [18, 20]
    shard: [1, 2, 3, 4]
\`\`\`

## What to ban in CI

- Tests that skip on CI (\`if (process.env.CI) return\`)
- Flaky tests left in main — quarantine them immediately
- Long-running smoke tests on every PR — move to a nightly job

## Assignment

Stand up GitHub Actions for your project: lint + unit + integration + E2E + coverage gate. Add a required status check on \`main\` and a deploy job that runs on green.`;

// ===== Module 8: Docker, DevOps & Production Deployment =====

const m8l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the concept of Containerization
- Learn the difference between Images and Containers
- Understand why Docker is essential for modern backend development
- Run your first Docker container

[video:9F6Cv_JHmrE]

## What is Docker?

Docker is a platform that allows you to package an application and all its dependencies into a single "container." 

### The "Works on my machine" Problem
In the past, you might build an app that works on your Mac but breaks on your teammate's Windows machine or the Linux production server. Docker solves this by creating an isolated environment that is **identical everywhere**.

## Core Concepts

1. **Docker Image:** A read-only template that contains the instructions for creating a container (like a recipe).
2. **Docker Container:** A running instance of an image (like the actual meal).
3. **Dockerfile:** A text file containing all the commands to build an image.

> [!TIP]
> **Pro Tip:** Think of a Docker Image as a **Snapshot** of your computer at a specific moment. You can share this snapshot with anyone, and they can run it exactly as you did.

## Why use Docker with NestJS?

- **Isolation:** You can run different versions of Node.js for different projects without conflicts.
- **Portability:** Ship your app to AWS, Google Cloud, or DigitalOcean with zero configuration changes.
- **Consistency:** Dev, Staging, and Production environments are 100% identical.

> [!CAUTION]
> **Common Pitfall:** Don't store data *inside* a container. Containers are meant to be "ephemeral" (meaning they can be deleted and recreated at any time). Use **Volumes** for persistent data like databases.

## Lesson Outro

You've just learned the technology that powers the modern cloud! Next, we'll write a **Dockerfile** for our NestJS application and build our very first custom image.
## Assignment

Pull \`postgres:16\`, run it, connect with \`psql\`, then run \`docker logs\` and identify three log lines you understand. Write down what each one means.`;

const m8l2 = `## Lesson Objective

Build a small, fast, production-ready Docker image for a Nest.js app using a multi-stage build.

## A naive Dockerfile (don't ship this)

\`\`\`dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm","run","start"]
\`\`\`

Problems: 1GB+ image, dev dependencies included, runs as root, no compile step.

## The production multi-stage build

\`\`\`dockerfile
# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# ---------- run ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist          ./dist
COPY --from=build --chown=app:app /app/package.json  ./
USER app
EXPOSE 3000
HEALTHCHECK CMD wget -q -O - http://localhost:3000/health || exit 1
CMD ["node","dist/main.js"]
\`\`\`

What this gets you:

- ~150MB final image (vs 1GB+)
- No dev dependencies in production
- Non-root user
- Health check the orchestrator can use
- Source maps and build cache stay in the build stage

## .dockerignore

\`\`\`text
node_modules
dist
.git
.env
*.log
test
**/*.spec.ts
\`\`\`

Without this, your build context can be hundreds of MB.

## Configuration via env

Inside the container, read everything from \`process.env\`. Use \`@nestjs/config\` to validate required vars at boot — fail fast if \`DATABASE_URL\` is missing.

## Build and push

\`\`\`bash
docker build -t ghcr.io/you/api:v1.4.2 .
docker push  ghcr.io/you/api:v1.4.2
\`\`\`

Tag with the git SHA *and* a human-readable version. Never deploy \`latest\`.

## Assignment

Write a multi-stage Dockerfile for your Nest app. Goal: final image under 200MB, builds in under 60 seconds on cache hit, runs as non-root.`;

const m8l3 = `## Lesson Objective

Use Docker Compose to orchestrate your Nest API together with Postgres and Redis as one local stack.

## Why Compose

In dev you want one command — \`docker compose up\` — that starts every service your app needs. No "start postgres, then redis, then the worker."

## A complete dev stack

\`\`\`yaml
# docker-compose.yml
services:
  api:
    build: .
    ports: ['3000:3000']
    env_file: .env
    depends_on:
      postgres: { condition: service_healthy }
      redis:    { condition: service_started }
    volumes:
      - ./src:/app/src       # hot reload in dev
    command: npm run start:dev

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ['CMD','pg_isready','-U','app']
      interval: 5s
    ports: ['5432:5432']

  redis:
    image: redis:7-alpine
    ports: ['6379:6379']

volumes:
  pgdata:
\`\`\`

## Networks

Compose creates a network where services reach each other by **name**. From the \`api\` container, the database URL is \`postgres://app:app@postgres:5432/app\` — not \`localhost\`.

## Volumes

- **Named volumes** (\`pgdata\`) — persist database data across \`docker compose down\`
- **Bind mounts** (\`./src:/app/src\`) — sync your code into the container for hot reload

## Compose for tests

Keep a separate \`docker-compose.test.yml\` with a throwaway DB on a different port so tests don't trample your dev data.

## Profiles

\`\`\`yaml
services:
  bull-board:
    image: deadly0/bull-board
    profiles: [tools]
\`\`\`

\`docker compose --profile tools up\` brings up optional services.

## Common gotchas

- App can't reach DB → check the service name, not localhost
- \`depends_on\` doesn't wait for the DB to accept connections — add a healthcheck
- Hot reload doesn't work → make sure the volume mount and Nest's \`watch\` mode are both active

## Assignment

Write a full Compose file for your app: API, worker, Postgres, Redis, and Mailhog for catching dev emails. One \`docker compose up\` should give a working environment.`;

const m8l4 = `## Lesson Objective

Manage configuration and secrets safely across dev, staging, and production — without leaking credentials into git or logs.

## The Twelve-Factor rule

Configuration lives in the **environment**, not in code. Same artifact, different env vars per stage.

## @nestjs/config with validation

\`\`\`ts
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env'],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development','test','production').required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().uri().required(),
    JWT_SECRET: Joi.string().min(32).required(),
    REDIS_URL: Joi.string().uri().required(),
  }),
}),
\`\`\`

Boot fails immediately if anything is missing — exactly what you want in production.

## Local: .env files

\`\`\`text
# .env  (gitignored)
DATABASE_URL=postgres://app:app@localhost:5432/app
JWT_SECRET=do-not-use-this-secret-anywhere-real

# .env.example  (committed)
DATABASE_URL=
JWT_SECRET=
\`\`\`

Commit \`.env.example\` so new contributors know what variables they need. **Never commit \`.env\`.**

## Production: a secret manager

Pick one — they all do the same job:

- AWS Secrets Manager / Parameter Store
- GCP Secret Manager
- HashiCorp Vault
- Doppler / Infisical

Your container reads secrets at boot via the platform's SDK or as injected env vars. Rotate keys regularly; rotation should be one CLI command.

## Docker secrets (Swarm / Compose v3)

\`\`\`yaml
services:
  api:
    secrets: [jwt_secret, db_password]
secrets:
  jwt_secret:  { file: ./secrets/jwt }
  db_password: { external: true }
\`\`\`

Secrets are mounted as files under \`/run/secrets/\` — not in env vars (which can leak via \`docker inspect\`).

## Logging hygiene

Redact secrets before they hit logs:

\`\`\`ts
LoggerModule.forRoot({
  pinoHttp: { redact: ['req.headers.authorization','req.headers.cookie','*.password','*.token'] },
}),
\`\`\`

## Rotation playbook

1. Generate the new secret in the manager
2. Deploy with both old and new accepted (\`JWT_SECRET\`, \`JWT_SECRET_OLD\`)
3. Wait one access-token TTL window
4. Remove the old secret

## Assignment

Move every credential out of your repo into a \`.env\` + secret manager. Add Joi validation. Write a runbook for rotating \`JWT_SECRET\` without downtime.`;

const m8l5 = `## Lesson Objective

Ship your Nest.js app to production — VPS, Render, or Railway — with a reverse proxy, TLS, monitoring, and a real release process.

## Pick a deployment target

- **Render / Railway / Fly.io** — easiest. \`git push\` and they build, deploy, give you HTTPS. Start here.
- **VPS (Hetzner, DigitalOcean)** — most control, cheapest at scale. You own the ops.
- **Kubernetes** — only when you have 10+ services and a platform team

## VPS deployment with Docker Compose

On a fresh Ubuntu box:

\`\`\`bash
# install Docker
curl -fsSL https://get.docker.com | sh
\`\`\`

\`\`\`yaml
# /opt/app/docker-compose.prod.yml
services:
  api:
    image: ghcr.io/you/api:v1.4.2
    restart: unless-stopped
    env_file: .env.prod
    expose: ['3000']
  postgres:
    image: postgres:16
    restart: unless-stopped
    volumes: [pgdata:/var/lib/postgresql/data]
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports: ['80:80','443:443']
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
volumes:
  pgdata: {}
  caddy_data: {}
\`\`\`

\`\`\`text
# Caddyfile
api.example.com {
  reverse_proxy api:3000
}
\`\`\`

Caddy gives you automatic HTTPS via Let's Encrypt. Zero config.

## Release process

1. Tag a release: \`git tag v1.4.2 && git push --tags\`
2. CI builds and pushes \`ghcr.io/you/api:v1.4.2\`
3. \`ssh prod 'docker compose pull && docker compose up -d'\`
4. Run migrations: \`docker compose run --rm api npm run migration:run\`

Better: a GitHub Action does steps 3–4 automatically on a green main.

## Zero-downtime deploys

- Run **at least two replicas** behind the reverse proxy
- Implement a real \`/health\` endpoint (\`@nestjs/terminus\`)
- Use rolling restart: bring up the new container, wait for healthy, kill the old one
- Make migrations **backwards-compatible** with the previous code version

## Monitoring & alerting

You need three things in production:

- **Logs** — Loki, CloudWatch, Datadog
- **Metrics** — Prometheus + Grafana (request rate, error rate, p95)
- **Alerts** — Pager on error rate > 1% or p95 > 1s

If you can't answer "is the app healthy right now?" in 10 seconds, the dashboard is wrong.

## Backups

Postgres backups every 6 hours, restored once a month to a staging instance. A backup you've never restored is not a backup.

## Assignment

Deploy your Nest app to a real domain with HTTPS, two replicas, a health check, a backup, and a Grafana dashboard. Write a one-page runbook for the next on-call engineer.`;

// ===== Module 9: Capstone =====

const m9l1 = `## Lesson Objective

By the end of this lesson, you will:

- Understand the scope of the NestJS Mastery Capstone Project
- Learn how to architect a multi-service application from scratch
- Design a real-world e-commerce backend (NestCommerce)
- Set up your production-ready project structure

[video:jOytv6PQxN0]

## The Capstone: NestCommerce

It's time to put everything you've learned into practice! You will build **NestCommerce**, a production-grade e-commerce backend.

### Core Features:
- **Modular Monolith or Microservices:** You choose the architecture.
- **Full Authentication:** JWT with Refresh Tokens and RBAC (Admin/User).
- **Product Management:** CRUD with image uploads (S3/Cloudinary).
- **Order System:** Handling complex transactions and state management.
- **Background Jobs:** Sending emails and generating invoices with BullMQ.
- **Automated Testing:** 70%+ unit and integration test coverage.

## Planning the Architecture

Before writing a single line of code, we must plan.

### 1. Service Boundaries
We'll split the app into logical modules:
- \`AuthModule\`: Handing users and security.
- \`CatalogModule\`: Products, Categories, and Inventory.
- \`OrderModule\`: Cart management and checkout.
- \`PaymentModule\`: Integration with Stripe (mocked).

### 2. The Data Model
We'll use **PostgreSQL** with **TypeORM** for its reliability and strong relation support.

> [!TIP]
> **Pro Tip:** In a real project, always draw your **Entity Relationship Diagram (ERD)** first. It will save you hours of refactoring later.

## Lesson Outro

This is where you separate yourself from the "tutorial-followers" and become a real **Software Engineer**. Let's start by initializing the project and setting up our core modules.

## Data model

\`\`\`text
users(id, email, password_hash, role)
products(id, name, slug, price_cents, stock)
orders(id, user_id, status, total_cents, created_at)
order_items(order_id, product_id, quantity, unit_price_cents)
\`\`\`

Money is stored as **integers** in cents. Never use floats for money.

## Communication map

- Gateway → all services over TCP
- Orders → Notifications over RabbitMQ (\`order.placed\` event)
- Notifications worker → SendGrid / FCM

## Infrastructure plan

- Docker Compose for local
- GitHub Actions for CI
- A single VPS with Caddy + Docker Compose for prod
- Postgres for data, Redis for cache + queues

## Deliverables for this lesson

1. A README with the system diagram
2. An OpenAPI spec stub for each service
3. A decisions log (why TCP not gRPC, why Postgres not Mongo, etc.)

## Assignment

Submit your architecture document. Get it reviewed before you write a line of code.`;

const m9l2 = `## Lesson Objective

Build the auth, users, catalog, and notifications services as standalone Nest apps with their own modules, tests, and Docker images.

## Monorepo layout

\`\`\`text
nestcommerce/
  apps/
    gateway/
    auth/
    catalog/
    orders/
    notifications/
  libs/
    shared-dtos/
    shared-config/
  docker-compose.yml
  package.json
\`\`\`

Use Nest's monorepo mode:

\`\`\`bash
nest new nestcommerce
nest generate app gateway
nest generate app auth
nest generate library shared-dtos
\`\`\`

## Auth service

- DTOs in \`libs/shared-dtos\` so the gateway and auth share types
- Postgres for users
- bcrypt + JWT
- \`@MessagePattern({ cmd: 'auth.signup' })\`, \`'auth.login'\`, \`'auth.verify-token'\`
- Tests: unit for the service, integration with the test DB

## Catalog service

- Read-mostly, so heavy Redis caching
- Endpoints: list products, get product, search, admin create/update
- Use cursor pagination for the list endpoint
- Tests: unit for filters/sort, integration for SQL

## Orders service

- The complex one — owns the workflow
- States: \`pending → paid → shipped → delivered | cancelled\`
- Emits events to RabbitMQ on every transition
- Wraps order placement in a transaction; reserves stock before payment
- Tests: unit for state machine, integration for transactions

## Notifications worker

- No HTTP surface — only listens on RabbitMQ
- Templates in \`templates/\`
- Pluggable providers (SendGrid, Postmark)
- Tests: unit for template rendering, integration with a mock SMTP server

## Shared concerns

Build once, reuse everywhere:

- A \`LoggerModule\` with correlation-id propagation
- A \`HealthModule\` that exposes \`/health\` consistently
- A \`ConfigModule\` with Joi validation

## Assignment

Get all four services + the gateway running locally with \`docker compose up\`. Each service has its own README, its own tests, and its own Dockerfile.`;

const m9l3 = `## Lesson Objective

Wire the services together through the gateway, add resilience patterns, and make the whole system observable.

## The gateway

The gateway is the only public surface. Every request:

1. Hits Caddy → TLS termination
2. Throttler guard checks rate limits (Redis-backed)
3. JWT guard verifies the token (calls auth service once, caches the answer)
4. Request handler fans out to the right downstream service
5. Response is logged with the correlation id

\`\`\`ts
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersGateway {
  constructor(@Inject('ORDERS') private orders: ClientProxy) {}

  @Post()
  create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.orders.send(
      { cmd: 'orders.create' },
      { ...dto, userId: req.user.userId },
    );
  }
}
\`\`\`

## Authorization at the edge

The gateway extracts the user from the JWT and forwards \`userId\` to downstream services. **Never trust** the client-sent \`userId\` — it comes from your verified token.

## Resilience patterns

- **Timeouts** — every downstream call has one. Default 5s, payments 30s
- **Retries** — only on idempotent reads, with exponential backoff
- **Circuit breaker** — wrap calls with \`opossum\`; open after 5 failures, half-open after 30s
- **Bulkheads** — separate connection pools per downstream so a slow service can't starve others

## Event-driven side effects

When orders publishes \`order.placed\`:

- Notifications worker sends a receipt email
- Analytics worker writes to a fact table
- Inventory worker decrements stock

None of those run synchronously in the request — the HTTP response is already on its way to the client.

## Observability

- **Structured logs** with a shared correlation id across services
- **Distributed tracing** with OpenTelemetry → Jaeger or Tempo
- **Metrics** with Prometheus: request rate, error rate, p95 per service
- **One Grafana dashboard** with a row per service

## Failure drills

Once it works, break it on purpose:

- Stop the notifications worker → orders still complete, emails queue up
- Pause the orders DB → gateway returns 503, doesn't crash
- Kill RabbitMQ → orders service degrades gracefully

If those drills don't pass, you don't have a resilient system.

## Assignment

Run the full system. Execute a load test with \`autocannon\` at 200 RPS for 5 minutes. Capture latency, error rate, and a flame graph of the slowest endpoint.`;

const m9l4 = `## Lesson Objective

Test the full capstone end-to-end, ship it to production with CI/CD, and finish with a runnable, monitored system.

## The testing matrix

| Layer | Tool | What it covers |
|---|---|---|
| Unit | Jest | Service logic, guards, pipes |
| Integration | Jest + test DB | SQL, repository, transactions |
| Service E2E | Supertest | Each service's HTTP/TCP surface |
| System E2E | Supertest against the gateway | Cross-service flows |
| Load | autocannon / k6 | p95, error rate at target RPS |

## A system E2E test

\`\`\`ts
it('signup → browse → order → receipt', async () => {
  // signup + login
  const { body: login } = await request(gateway).post('/auth/signup').send(creds).expect(201);
  const token = login.access_token;

  // browse
  const { body: products } = await request(gateway).get('/products').expect(200);

  // order
  const { body: order } = await request(gateway)
    .post('/orders')
    .set('Authorization', \`Bearer \${token}\`)
    .send({ items: [{ productId: products.items[0].id, qty: 1 }] })
    .expect(201);
  expect(order.status).toBe('pending');

  // notification worker eventually sends receipt
  await waitFor(() => expect(mockMailer.sent).toContainEqual(
    expect.objectContaining({ template: 'order-receipt', orderId: order.id }),
  ));
});
\`\`\`

## CI/CD pipeline

\`\`\`text
PR opened
  → lint, type-check, unit, integration, service E2E (parallel per service)
  → coverage gate
  → required check: all green
PR merged to main
  → build images, tag with git SHA
  → push to registry
  → system E2E against the staging stack
  → deploy to production (rolling)
  → smoke test against prod
  → notify Slack
\`\`\`

## Production checklist

- [ ] HTTPS with auto-renewing certs
- [ ] Two API replicas, one DB primary, daily backups
- [ ] Health checks on every service
- [ ] Structured JSON logs shipping to a log aggregator
- [ ] Metrics dashboard with the 4 golden signals (latency, traffic, errors, saturation)
- [ ] Alerts on error rate > 1% and p95 > 1s
- [ ] Runbook for the top 5 incident types
- [ ] Documented secret rotation procedure
- [ ] On-call rotation (even if it's just you for now)

## What "done" looks like

A new engineer can clone the repo, run \`docker compose up\`, see a working app, run \`npm test\` and watch every test pass, push a PR, and watch CI build, test, and deploy it — without asking you a single question. That is the bar.

## Final assignment

Ship the capstone. Tag \`v1.0.0\`. Open the README and verify someone new to the project could ship a fix on day one. Then write a short post explaining what you built, what you'd do differently next time, and what you learned. That post — and the repo it links to — goes at the top of your portfolio.`;

export const modules: Module[] = [
  {
    id: "foundations",
    title: "Foundations of Professional Backend Engineering",
    tagline: "Think like a backend engineer. Master Nest.js core architecture.",
    icon: "Boxes",
    video: {
      title: "NestJS Crash Course — Build a REST API",
      channel: "Net Ninja / freeCodeCamp",
      query: "NestJS crash course tutorial for beginners",
    },
    overview: `## Module 1: Introduction

NestJS is a progressive Node.js framework built on top of Express. It combines OOP, Functional Programming, and Functional Reactive Programming, and uses TypeScript to enforce type safety at compile time.

Topics it covers end-to-end: Dependency Injection, Authentication, ORM, REST APIs, WebSockets, Microservices, Routing, OpenAPI, CQRS, and Testing.

## Nest CLI

\`\`\`bash
npm install -g @nestjs/cli
nest new [project-name]
nest g s [service-name]
\`\`\`

Generators include class, controller, decorator, exception, filter, gateway, guard, interceptor, middleware, module, pipe, provider, and service.

## Nest-specific tools

- **@Module** — defines a reusable code package (imports, exports, providers, controllers)
- **@Injectable** — almost everything in Nest is a provider injected through constructors
- **Middleware / Interceptor / Pipe / Guard** — the four request-layer concepts you'll master in Module 1`,
    lessons: [
      { id: "architecture", title: "Understanding Modern Backend Architecture", duration: "15 min", content: m1l1 },
      { id: "environment", title: "Setting Up a Professional Nest.js Environment", duration: "20 min", content: m1l2 },
      { id: "core-concepts", title: "Nest.js Core Concepts: Modules, Controllers, Providers", duration: "30 min", content: m1l3 },
      { id: "typescript", title: "TypeScript for Professional Backend Engineers", duration: "25 min", content: m1l4 },
      { id: "lifecycle", title: "The Nest.js Request Lifecycle", duration: "35 min", content: m1l5 },
    ],
  },
  {
    id: "rest-apis",
    title: "Production-Grade REST APIs",
    tagline: "Build scalable, validated, documented APIs the professional way.",
    icon: "Network",
    video: {
      title: "Build a REST API with NestJS — CRUD, DTOs & Swagger",
      channel: "Marius Espejo",
      query: "NestJS REST API CRUD tutorial DTO swagger",
    },
    overview: `## Module: REST APIs in Nest

REST stands for Representative State Transfer and uses JSON as a transfer format. A REST request in Nest flows: client → routing → middleware → controller → service → database via ORM → response.

\`\`\`ts
@Controller('hello')
export class HelloWorldController {
  @Get('world')
  printHelloWorld() { return 'Hello World'; }
}
\`\`\`

## OpenAPI (Swagger)

The \`@nestjs/swagger\` module provides decorators that describe inputs, outputs, and endpoints — exposed as live documentation at \`/docs\`.`,
    lessons: [
      { id: "crud", title: "Creating CRUD APIs with Nest.js", duration: "45 min", content: m2l1 },
      { id: "validation", title: "Data Validation & Error Handling", duration: "25 min", content: m2l2 },
      { id: "swagger", title: "API Documentation with Swagger", duration: "20 min", content: m2l3 },
      { id: "pagination", title: "Pagination, Filtering & Search", duration: "35 min", content: m2l4 },
      { id: "logging", title: "Logging & Monitoring", duration: "20 min", content: m2l5 },
    ],
  },
  {
    id: "auth-security",
    title: "Authentication, Security & Authorization",
    tagline: "Secure enterprise backend systems end-to-end.",
    icon: "Shield",
    video: {
      title: "NestJS Authentication with JWT & Passport",
      channel: "Marius Espejo",
      query: "NestJS authentication JWT passport tutorial",
    },
    overview: `## Module 3: Authentication

Authentication ensures users only access what they have permission to. **Passport** is the chosen Node middleware; with Nest it commonly uses a **JWT strategy**.

\`\`\`ts
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async resolve(strategy: string) {
    return async (req, res, next) => {
      return passport.authenticate(strategy, async (...args: any[]) => {
        const [, payload, err] = args;
        if (err) return res.status(HttpStatus.BAD_REQUEST).send('Unable to authenticate.');
        req.user = await this.userService.findOne({ where: { email: payload.email } });
        return next();
      })(req, res, next);
    };
  }
}
\`\`\`

## Guards

Guards implement \`CanActivate\` and decide whether a request reaches its handler — used for role checks and resource ownership.`,
    lessons: [
      { id: "jwt", title: "Authentication with JWT", duration: "40 min", content: m3l1 },
      { id: "rbac", title: "Role-Based Access Control (RBAC)", duration: "30 min", content: m3l2 },
      { id: "passwords", title: "Password Security & Encryption", duration: "20 min", content: m3l3 },
      { id: "api-security", title: "API Security Best Practices", duration: "30 min", content: m3l4 },
    ],
  },
  {
    id: "database",
    title: "Scalable Database Systems",
    tagline: "Design and manage scalable backend databases professionally.",
    icon: "Database",
    video: {
      title: "NestJS + TypeORM + PostgreSQL — Full Tutorial",
      channel: "freeCodeCamp",
      query: "NestJS TypeORM PostgreSQL tutorial",
    },
    overview: `## Module 5: ORM

An ORM maps in-memory objects (\`User\`, \`Comment\`) to relational tables. The book covers three:

- **TypeORM** — mature, with \`@nestjs/typeorm\`; supports Postgres, MySQL, MariaDB, SQLite, MSSQL, Oracle
- **Sequelize** — *the* most popular Node ORM, written in JS with TS bindings
- **Mongoose** — for MongoDB; \`@nestjs/mongoose\` ships official integration with query chaining`,
    lessons: [
      { id: "fundamentals", title: "Database Fundamentals for Backend Engineers", duration: "20 min", content: m4l1 },
      { id: "postgres", title: "Using PostgreSQL with Nest.js", duration: "45 min", content: m4l2 },
      { id: "orm-patterns", title: "Advanced ORM Patterns", duration: "35 min", content: m4l3 },
      { id: "redis-cache", title: "Caching with Redis", duration: "25 min", content: m4l4 },
    ],
  },
  {
    id: "microservices",
    title: "Microservices Architecture",
    tagline: "Build distributed systems professionally with Nest.js.",
    icon: "Network",
    video: {
      title: "NestJS Microservices — TCP, Redis & RabbitMQ",
      channel: "Marius Espejo",
      query: "NestJS microservices tutorial TCP Redis RabbitMQ",
    },
    overview: `## Module: Microservices in Nest

In Nest, **microservices are applications that use a transport layer other than HTTP** — TCP, Redis pub/sub, or others (any custom transport via \`CustomTransportStrategy\`). They allow teams to work on their own service inside a global project and ship changes independently — the foundation of CI/CD at scale.

## WebSockets

For real-time fan-out (chat, dashboards), clients subscribe to channels; the server broadcasts to every subscriber as data arrives.`,
    lessons: [
      { id: "intro", title: "Introduction to Microservices", duration: "25 min", content: m5l1 },
      { id: "first-service", title: "Building Your First Nest.js Microservice", duration: "50 min", content: m5l2 },
      { id: "event-driven", title: "Event-Driven Architecture", duration: "35 min", content: m5l3 },
      { id: "api-gateway", title: "API Gateway Pattern", duration: "40 min", content: m5l4 },
      { id: "rabbitmq", title: "RabbitMQ & Message Queues", duration: "45 min", content: m5l5 },
    ],
  },
  {
    id: "performance",
    title: "Performance with Queues & Caching",
    tagline: "Build highly scalable systems for real-world traffic.",
    icon: "Zap",
    video: {
      title: "BullMQ Background Jobs & Redis Caching with NestJS",
      channel: "Marius Espejo",
      query: "NestJS BullMQ Redis background jobs caching tutorial",
    },
    overview: `## CQRS — the mental model behind this module

**Command Query Responsibility Segregation**: every method should either *perform an action* (command) or *return data* (query), not both. Controllers don't call the database directly — they delegate to a service that owns the boundary.

That separation is what enables background jobs, caching, and queues without leaking concerns across layers.`,
    lessons: [
      { id: "bullmq", title: "Background Jobs with BullMQ", duration: "35 min", content: m6l1 },
      { id: "notifications", title: "Email & Notification Systems", duration: "25 min", content: m6l2 },
      { id: "redis-advanced", title: "Advanced Redis Strategies", duration: "30 min", content: m6l3 },
      { id: "optimization", title: "Performance Optimization", duration: "40 min", content: m6l4 },
    ],
  },
  {
    id: "testing",
    title: "Automated Testing for Confidence",
    tagline: "Unit, integration, and E2E testing — ship without fear.",
    icon: "FlaskConical",
    video: {
      title: "NestJS Testing — Unit, Integration, and E2E with Jest",
      channel: "Marius Espejo",
      query: "NestJS testing tutorial jest supertest unit e2e",
    },
    overview: `## Module: Testing

Two kinds of tests:

- **Unit Tests** — testing small blocks of code (functions, controllers, interceptors, injectables). Use \`@nestjs/testing\` with \`*.spec.ts\` files.
- **E2E Tests** — testing entire functionality end-to-end. Use **Jest** to mock and **Supertest** to simulate HTTP requests.

Testing matters regardless of language or framework. Large engineering organizations have dedicated QA teams writing the tests that keep production safe.`,
    lessons: [
      { id: "fundamentals", title: "Testing Fundamentals", duration: "20 min", content: m7l1 },
      { id: "unit", title: "Unit Testing with Jest", duration: "40 min", content: m7l2 },
      { id: "integration", title: "Integration Testing", duration: "35 min", content: m7l3 },
      { id: "e2e", title: "End-to-End Testing with Supertest", duration: "45 min", content: m7l4 },
      { id: "cicd", title: "CI/CD Testing Pipelines", duration: "30 min", content: m7l5 },
    ],
  },
  {
    id: "docker",
    title: "Docker, DevOps & Production Deployment",
    tagline: "Containerize, orchestrate, and deploy professional systems.",
    icon: "Container",
    video: {
      title: "Dockerize a NestJS App + Postgres with Docker Compose",
      channel: "Marius Espejo",
      query: "NestJS Docker docker-compose postgres production deployment",
    },
    overview: `## Docker, DevOps & Production Deployment

Containers package your app, its OS dependencies, and its config into one shippable artifact that runs identically on a laptop, CI, staging, and production. The book even ships Nest CLI as a Docker image: \`docker pull nestjs/cli:[version]\`.

This module turns containers into a full production story: multi-stage Dockerfiles, Compose for the whole stack, secrets, and a real release pipeline.`,
    lessons: [
      { id: "fundamentals", title: "Docker Fundamentals", duration: "25 min", content: m8l1 },
      { id: "dockerize", title: "Dockerizing Nest.js Applications", duration: "45 min", content: m8l2 },
      { id: "compose", title: "Docker Compose for Fullstack Systems", duration: "35 min", content: m8l3 },
      { id: "secrets", title: "Environment Variables & Secrets Management", duration: "20 min", content: m8l4 },
      { id: "deploy", title: "Deploying to Production", duration: "50 min", content: m8l5 },
    ],
  },
  {
    id: "capstone",
    title: "Capstone: Enterprise Backend Platform",
    tagline: "Apply everything — build a real-world production system.",
    icon: "Trophy",
    video: {
      title: "Build & Deploy a Full NestJS Microservices Platform",
      channel: "Marius Espejo",
      query: "NestJS full project microservices docker production",
    },
    overview: `## Capstone — apply everything

In the capstone you'll combine every module into one production-grade platform: Nest core architecture, REST APIs, JWT auth, an ORM-backed database, microservices over TCP and RabbitMQ, queues + caching, automated tests, and Docker deployment.

Deliverables: architecture doc, core services, microservice integration, CI/CD with full test coverage, and a documented production deployment.`,
    lessons: [
      { id: "planning", title: "Project Architecture Planning", duration: "Workshop", content: m9l1 },
      { id: "core-services", title: "Building Core Services", duration: "Workshop", content: m9l2 },
      { id: "integration", title: "Integrating Microservices", duration: "Workshop", content: m9l3 },
      { id: "deploy", title: "Testing & Production Deployment", duration: "Workshop", content: m9l4 },
    ],
  },
];

export const allLessons = modules.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })),
);

export function findLesson(moduleId: string, lessonId: string) {
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) return null;
  const idx = mod.lessons.findIndex((l) => l.id === lessonId);
  if (idx === -1) return null;
  
  return {
    module: mod,
    lesson: mod.lessons[idx],
    prev: idx > 0 ? { moduleId, lessonId: mod.lessons[idx - 1].id } : null,
    next:
      idx < mod.lessons.length - 1
        ? { moduleId, lessonId: mod.lessons[idx + 1].id }
        : (() => {
            const mi = modules.findIndex((m) => m.id === moduleId);
            if (mi < modules.length - 1) {
              const nm = modules[mi + 1];
              return { moduleId: nm.id, lessonId: nm.lessons[0].id };
            }
            return null;
          })(),
  };
}

export const totalLessons = allLessons.length;

