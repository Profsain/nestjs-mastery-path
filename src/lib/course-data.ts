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

## Lesson Introduction

Imagine opening WhatsApp, Instagram, Moniepoint, Uber, or Netflix. When you click a button, what actually happens behind the scenes? How does your login work? How do your messages save instantly? How does your payment process securely?

That invisible system powering everything is the **backend**.

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

### When to Use Each

- **Monolith** is best for startups, MVPs, small teams, early-stage products.
- **Microservices** are best for large-scale systems, enterprise products, multiple engineering teams.

Nest.js supports **both** — monoliths, microservices, event-driven, and hybrid architectures. This is what makes it extremely powerful.

## Backend Engineer Mindset

Beginners think: *"How do I write code?"*
Professional engineers think: *"How do I design scalable systems?"*

This course teaches both.

## Quick Knowledge Check

**Q1.** What is the primary role of the backend?
- A. Designing UI
- **B. Managing business logic and data** ✓
- C. Styling websites
- D. Creating animations

**Q2.** What does an API do?
- A. Stores passwords
- B. Designs interfaces
- **C. Allows systems to communicate** ✓
- D. Replaces databases

**Q3.** Which architecture is easier for startups initially?
- A. Microservices
- **B. Monolith** ✓
- C. Distributed systems
- D. Event sourcing

## Practical Exercise

Analyze 3 applications you use daily. For each app, identify the frontend, possible backend operations, and likely database usage.

**Example — WhatsApp:**
- Frontend: Mobile app
- Backend: Message processing
- Database: Chat history storage

## Assignment

Write a short explanation (minimum 300 words): *"How does a food delivery app work internally from frontend to backend?"*

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

// ---------- Modules 2–9 — concise lesson outlines ----------

const outline = (title: string, bullets: string[], format: string[]) => `## ${title}

### What you'll learn

${bullets.map((b) => `- ${b}`).join("\n")}

### Lesson format

${format.map((f) => `- ${f}`).join("\n")}

### Coming in this lesson

Deep-dive instructional content for this lesson is being authored next. It will follow the same teaching style as Module 1: story-driven explanations, real-world analogies, visual mental models, guided implementation, knowledge checks, exercises, and an assignment.`;

export const modules: Module[] = [
  {
    id: "foundations",
    title: "Foundations of Professional Backend Engineering",
    tagline: "Think like a backend engineer. Master Nest.js core architecture.",
    icon: "Boxes",
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
    lessons: [
      { id: "crud", title: "Creating CRUD APIs with Nest.js", duration: "45 min", content: outline("Creating CRUD APIs", ["REST conventions and resource design","Full CRUD operations","DTOs and request validation","Swagger documentation"], ["45-minute coding tutorial","Swagger documentation template","Coding challenge"]) },
      { id: "validation", title: "Data Validation & Error Handling", duration: "25 min", content: outline("Data Validation & Error Handling", ["class-validator deep dive","Custom pipes","Global exception filters","Consistent API response shape"], ["25-minute implementation lesson","Error-handling checklist","Quiz"]) },
      { id: "swagger", title: "API Documentation with Swagger", duration: "20 min", content: outline("API Documentation with Swagger", ["OpenAPI fundamentals","Swagger module setup","API versioning","Documentation best practices"], ["20-minute tutorial","Swagger starter config","Practical exercise"]) },
      { id: "pagination", title: "Pagination, Filtering & Search", duration: "35 min", content: outline("Pagination, Filtering & Search", ["Query parameter design","Cursor vs offset pagination","Sorting strategies","Search optimization"], ["35-minute implementation video","Reusable utility templates","Mini project"]) },
      { id: "logging", title: "Logging & Monitoring", duration: "20 min", content: outline("Logging & Monitoring", ["Nest Logger service","Request tracing","Error logging","Debugging strategies"], ["20-minute implementation session","Logging template","Monitoring checklist"]) },
    ],
  },
  {
    id: "auth-security",
    title: "Authentication, Security & Authorization",
    tagline: "Secure enterprise backend systems end-to-end.",
    icon: "Shield",
    lessons: [
      { id: "jwt", title: "Authentication with JWT", duration: "40 min", content: outline("Authentication with JWT", ["JWT fundamentals","Login flow design","Access vs refresh tokens","Token rotation strategies"], ["40-minute coding tutorial","Auth flow diagrams","Quiz"]) },
      { id: "rbac", title: "Role-Based Access Control (RBAC)", duration: "30 min", content: outline("RBAC", ["Guards for authorization","Role decorators","Permission strategies","Hierarchical roles"], ["30-minute coding lesson","RBAC implementation template","Assignment"]) },
      { id: "passwords", title: "Password Security & Encryption", duration: "20 min", content: outline("Password Security", ["Hashing algorithms","bcrypt deep dive","Environment variables","Secure credential management"], ["20-minute lesson","Security checklist","Practical lab"]) },
      { id: "api-security", title: "API Security Best Practices", duration: "30 min", content: outline("API Security", ["CORS configuration","Helmet middleware","Rate limiting","Input sanitization"], ["30-minute implementation video","Security audit worksheet","Quiz"]) },
    ],
  },
  {
    id: "database",
    title: "Scalable Database Systems",
    tagline: "Design and manage scalable backend databases professionally.",
    icon: "Database",
    lessons: [
      { id: "fundamentals", title: "Database Fundamentals for Backend Engineers", duration: "20 min", content: outline("Database Fundamentals", ["SQL vs NoSQL","Relational modeling","Normalization","Database architecture"], ["20-minute conceptual lesson","Architecture diagrams","Quiz"]) },
      { id: "postgres", title: "Using PostgreSQL with Nest.js", duration: "45 min", content: outline("PostgreSQL with Nest.js", ["Database setup","ORM integration (TypeORM/Prisma)","Entities and schemas","Migrations"], ["45-minute coding workshop","Starter templates","Exercises"]) },
      { id: "orm-patterns", title: "Advanced ORM Patterns", duration: "35 min", content: outline("Advanced ORM Patterns", ["Relations and joins","Transactions","Repository pattern","Query optimization"], ["35-minute implementation session","Practice tasks","Assignment"]) },
      { id: "redis-cache", title: "Caching with Redis", duration: "25 min", content: outline("Caching with Redis", ["Redis fundamentals","Cache strategies","Performance optimization","Cache invalidation"], ["25-minute implementation tutorial","Redis configuration guide","Mini project"]) },
    ],
  },
  {
    id: "microservices",
    title: "Microservices Architecture",
    tagline: "Build distributed systems professionally with Nest.js.",
    icon: "Network",
    lessons: [
      { id: "intro", title: "Introduction to Microservices", duration: "25 min", content: outline("Introduction to Microservices", ["Why microservices","Service boundaries","Communication patterns","Trade-offs"], ["25-minute theory lesson","Architecture diagrams","Quiz"]) },
      { id: "first-service", title: "Building Your First Nest.js Microservice", duration: "50 min", content: outline("First Microservice", ["TCP transport","Message patterns","Service communication","Hybrid apps"], ["50-minute coding workshop","Starter repo","Practice lab"]) },
      { id: "event-driven", title: "Event-Driven Architecture", duration: "35 min", content: outline("Event-Driven Architecture", ["Pub/Sub systems","Event emitters","Asynchronous communication","Event sourcing basics"], ["35-minute implementation lesson","Event architecture templates","Assignment"]) },
      { id: "api-gateway", title: "API Gateway Pattern", duration: "40 min", content: outline("API Gateway Pattern", ["Gateway architecture","Centralized authentication","Request routing","Aggregation"], ["40-minute coding session","Gateway template","System design exercise"]) },
      { id: "rabbitmq", title: "RabbitMQ & Message Queues", duration: "45 min", content: outline("RabbitMQ & Queues", ["Queue systems","Producers and consumers","Retry strategies","Dead-letter queues"], ["45-minute practical implementation","Queue configuration templates","Lab exercise"]) },
    ],
  },
  {
    id: "performance",
    title: "Performance with Queues & Caching",
    tagline: "Build highly scalable systems for real-world traffic.",
    icon: "Zap",
    lessons: [
      { id: "bullmq", title: "Background Jobs with BullMQ", duration: "35 min", content: outline("BullMQ", ["Queue workers","Delayed jobs","Retry strategies","Job priorities"], ["35-minute coding lesson","Queue templates","Practical assignment"]) },
      { id: "notifications", title: "Email & Notification Systems", duration: "25 min", content: outline("Notification Systems", ["Mail queues","SMS workflows","Notification architecture","Templating"], ["25-minute implementation tutorial","Notification templates","Exercise"]) },
      { id: "redis-advanced", title: "Advanced Redis Strategies", duration: "30 min", content: outline("Advanced Redis", ["Distributed caching","Session storage","Rate limiting with Redis","Pub/Sub"], ["30-minute coding workshop","Scaling checklist","Quiz"]) },
      { id: "optimization", title: "Performance Optimization", duration: "40 min", content: outline("Performance Optimization", ["Profiling","Database indexing","Query optimization","Bottleneck analysis"], ["40-minute optimization workshop","Performance checklist","Debugging lab"]) },
    ],
  },
  {
    id: "testing",
    title: "Automated Testing for Confidence",
    tagline: "Unit, integration, and E2E testing — ship without fear.",
    icon: "FlaskConical",
    lessons: [
      { id: "fundamentals", title: "Testing Fundamentals", duration: "20 min", content: outline("Testing Fundamentals", ["Why testing matters","Unit vs integration vs E2E","Testing pyramid","Test-driven development"], ["20-minute conceptual lesson","Testing cheat sheet","Quiz"]) },
      { id: "unit", title: "Unit Testing with Jest", duration: "40 min", content: outline("Unit Testing", ["Jest fundamentals","Mocking dependencies","Testing services","DI in tests"], ["40-minute coding workshop","Reusable test templates","Exercises"]) },
      { id: "integration", title: "Integration Testing", duration: "35 min", content: outline("Integration Testing", ["Database testing","API testing","Test environments","Test data seeding"], ["35-minute implementation lesson","Integration test starter repo","Lab exercise"]) },
      { id: "e2e", title: "End-to-End Testing with Supertest", duration: "45 min", content: outline("E2E Testing", ["Full API testing","Supertest","Real-world workflows","Authenticated flows"], ["45-minute coding session","E2E testing checklist","Assignment"]) },
      { id: "cicd", title: "CI/CD Testing Pipelines", duration: "30 min", content: outline("CI/CD Pipelines", ["GitHub Actions","Automated testing","Deployment validation","Coverage gates"], ["30-minute DevOps lesson","CI workflow templates","Practical challenge"]) },
    ],
  },
  {
    id: "docker",
    title: "Docker, DevOps & Production Deployment",
    tagline: "Containerize, orchestrate, and deploy professional systems.",
    icon: "Container",
    lessons: [
      { id: "fundamentals", title: "Docker Fundamentals", duration: "25 min", content: outline("Docker Fundamentals", ["Containers explained","Docker architecture","Images vs containers","Layers and caching"], ["25-minute conceptual lesson","Docker cheat sheet","Quiz"]) },
      { id: "dockerize", title: "Dockerizing Nest.js Applications", duration: "45 min", content: outline("Dockerizing Nest.js", ["Dockerfiles","Multi-stage builds","Production optimization","Image size reduction"], ["45-minute implementation workshop","Production Docker templates","Assignment"]) },
      { id: "compose", title: "Docker Compose for Fullstack Systems", duration: "35 min", content: outline("Docker Compose", ["PostgreSQL containers","Redis containers","Multi-service orchestration","Networks and volumes"], ["35-minute coding lesson","docker-compose templates","Practical lab"]) },
      { id: "secrets", title: "Environment Variables & Secrets Management", duration: "20 min", content: outline("Secrets Management", [".env management","Secure deployments","Config modules","Secret rotation"], ["20-minute implementation lesson","Security checklist","Quiz"]) },
      { id: "deploy", title: "Deploying to Production", duration: "50 min", content: outline("Production Deployment", ["VPS deployment","Render / Railway deployment","Monitoring","Nginx reverse proxy"], ["50-minute deployment workshop","Deployment scripts","Production checklist"]) },
    ],
  },
  {
    id: "capstone",
    title: "Capstone: Enterprise Backend Platform",
    tagline: "Apply everything — build a real-world production system.",
    icon: "Trophy",
    lessons: [
      { id: "planning", title: "Project Architecture Planning", duration: "Workshop", content: outline("Architecture Planning", ["System design","Service boundaries","Database planning","API contracts"], ["Architecture workshop","Planning templates","System diagrams"]) },
      { id: "core-services", title: "Building Core Services", duration: "Workshop", content: outline("Core Services", ["Authentication service","User service","Notification service","Shared libraries"], ["Guided implementation videos","Source code walkthroughs","Coding labs"]) },
      { id: "integration", title: "Integrating Microservices", duration: "Workshop", content: outline("Microservice Integration", ["Service communication","API gateway","Event architecture","Resilience patterns"], ["Full implementation workshop","Debugging walkthrough","Assignment"]) },
      { id: "deploy", title: "Testing & Production Deployment", duration: "Workshop", content: outline("Final Deployment", ["Full test coverage","Docker deployment","CI/CD integration","Monitoring setup"], ["Production deployment workshop","Deployment checklist","Final review"]) },
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
