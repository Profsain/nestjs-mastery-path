export type Lesson = {
  id: string;
  title: string;
  duration: string;
  content: string; // simple markdown-ish: ## headings, ```code```, lists, paragraphs
};

export type Module = {
  id: string;
  title: string;
  tagline: string;
  icon: string; // lucide name
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    id: "nestjs",
    title: "NestJS Fundamentals",
    tagline: "Master the architecture: modules, providers, DI, pipes, guards.",
    icon: "Boxes",
    lessons: [
      {
        id: "intro",
        title: "Why NestJS?",
        duration: "8 min",
        content: `## A framework, not a library

NestJS gives Node.js what Spring gave Java and Angular gave the frontend: a **strong architectural opinion**. Out of the box you get dependency injection, modules, decorators, and a battle-tested testing story.

## What you'll build in this course

- A production-grade REST API
- A PostgreSQL data layer with migrations
- A fully Dockerized environment
- Unit and end-to-end test suites

\`\`\`bash
npm i -g @nestjs/cli
nest new my-api
cd my-api && npm run start:dev
\`\`\`

## The mental model

Every Nest app is a tree of **modules**. Each module wires up **providers** (services) and **controllers** (HTTP handlers). Dependency injection threads them together — you never \`new\` anything yourself.`,
      },
      {
        id: "modules-controllers",
        title: "Modules & Controllers",
        duration: "12 min",
        content: `## Modules group features

A module is a class with the \`@Module()\` decorator. Think of it as a folder with intent.

\`\`\`ts
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
\`\`\`

## Controllers handle HTTP

\`\`\`ts
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }
}
\`\`\`

## Rules of thumb

- One feature → one module
- Controllers stay thin; logic lives in services
- Export only what other modules need`,
      },
      {
        id: "di-providers",
        title: "Dependency Injection & Providers",
        duration: "15 min",
        content: `## DI in one paragraph

You declare a class as injectable, list it in a module's \`providers\`, and Nest instantiates it once and hands it to anyone that asks via the constructor. That's it.

\`\`\`ts
@Injectable()
export class UsersService {
  private users = new Map<string, User>();
  findAll() { return [...this.users.values()]; }
}
\`\`\`

## Custom providers

Sometimes you need a value, a factory, or a swap:

\`\`\`ts
{
  provide: 'CONFIG',
  useFactory: () => ({ apiKey: process.env.API_KEY }),
}
\`\`\`

Inject it with \`@Inject('CONFIG')\`.`,
      },
      {
        id: "pipes-guards",
        title: "Pipes, Guards & Interceptors",
        duration: "14 min",
        content: `## The request pipeline

Middleware → Guards → Interceptors → Pipes → Handler → Interceptors → Filters.

## Validation with pipes

\`\`\`ts
export class CreateUserDto {
  @IsEmail() email: string;
  @MinLength(8) password: string;
}

@Post()
create(@Body() dto: CreateUserDto) { /* validated */ }
\`\`\`

Enable globally:

\`\`\`ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
\`\`\`

## Guards = authorization

\`\`\`ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    return Boolean(req.headers.authorization);
  }
}
\`\`\`

## Interceptors = cross-cutting concerns

Logging, caching, response shaping, timeouts. Wrap the handler with RxJS.`,
      },
    ],
  },
  {
    id: "database",
    title: "Database with Prisma & PostgreSQL",
    tagline: "Schema, migrations, relations, transactions — done right.",
    icon: "Database",
    lessons: [
      {
        id: "setup",
        title: "Connecting Prisma to Nest",
        duration: "10 min",
        content: `## Install & init

\`\`\`bash
npm i prisma -D && npm i @prisma/client
npx prisma init
\`\`\`

## A PrismaModule you can inject

\`\`\`ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() { await this.$connect(); }
}

@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
\`\`\`

Now any service can \`constructor(private prisma: PrismaService)\` and query.`,
      },
      {
        id: "schema",
        title: "Schema & Migrations",
        duration: "12 min",
        content: `## schema.prisma

\`\`\`prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       String  @id @default(uuid())
  title    String
  authorId String
  author   User    @relation(fields: [authorId], references: [id])
}
\`\`\`

## Migrate

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

Prisma generates SQL, applies it, and regenerates the typed client.`,
      },
      {
        id: "queries",
        title: "Queries, Relations & Transactions",
        duration: "14 min",
        content: `## Reads with relations

\`\`\`ts
this.prisma.user.findMany({
  include: { posts: true },
  where: { email: { contains: '@acme.com' } },
});
\`\`\`

## Transactions

\`\`\`ts
await this.prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { email, password } });
  await tx.post.create({ data: { title: 'Welcome', authorId: user.id } });
});
\`\`\`

If anything throws, **everything rolls back**.`,
      },
    ],
  },
  {
    id: "docker",
    title: "Docker & Deployment",
    tagline: "From localhost to a production container in one Compose file.",
    icon: "Container",
    lessons: [
      {
        id: "dockerfile",
        title: "A Multi-stage Dockerfile",
        duration: "12 min",
        content: `## Why multi-stage?

Build with all dev deps, ship only what runs. Smaller image, smaller attack surface.

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
\`\`\``,
      },
      {
        id: "compose",
        title: "docker-compose for Dev",
        duration: "10 min",
        content: `## One command, full stack

\`\`\`yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://nest:nest@db:5432/nest
    depends_on: [db]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: nest
      POSTGRES_PASSWORD: nest
      POSTGRES_DB: nest
    volumes: [pgdata:/var/lib/postgresql/data]
    ports: ["5432:5432"]
volumes:
  pgdata:
\`\`\`

\`docker compose up --build\` and you're live.`,
      },
      {
        id: "production",
        title: "Production Checklist",
        duration: "9 min",
        content: `## Before you deploy

- **Non-root user** in the image (\`USER node\`)
- **Healthcheck** endpoint (\`/health\`) wired to orchestrator
- **Graceful shutdown**: \`app.enableShutdownHooks()\`
- **Env secrets** injected at runtime, never baked in
- **Logs to stdout** — let the platform aggregate
- **Resource limits** on the container

## CI/CD shape

Build → test → push image → deploy. Tag images by git SHA so you can roll back in seconds.`,
      },
    ],
  },
  {
    id: "testing",
    title: "Testing: Unit & E2E",
    tagline: "Jest, mocking, supertest — ship with confidence.",
    icon: "FlaskConical",
    lessons: [
      {
        id: "unit",
        title: "Unit-testing Services",
        duration: "12 min",
        content: `## The Nest testing module

\`\`\`ts
describe('UsersService', () => {
  let service: UsersService;
  let prisma = { user: { findUnique: jest.fn() } };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = mod.get(UsersService);
  });

  it('finds a user by id', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'a@b.c' });
    expect(await service.findOne('1')).toMatchObject({ email: 'a@b.c' });
  });
});
\`\`\`

**Mock dependencies, test logic.** That's the whole game.`,
      },
      {
        id: "e2e",
        title: "End-to-end with supertest",
        duration: "13 min",
        content: `## Boot the real app

\`\`\`ts
let app: INestApplication;

beforeAll(async () => {
  const mod = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = mod.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

it('GET /users → 200', () =>
  request(app.getHttpServer()).get('/users').expect(200));

it('POST /users validates body', () =>
  request(app.getHttpServer())
    .post('/users')
    .send({ email: 'not-an-email' })
    .expect(400));
\`\`\`

E2E tests catch what unit tests can't: wiring, validation, guards, and DB integration.`,
      },
      {
        id: "tdd",
        title: "TDD & Coverage Strategy",
        duration: "10 min",
        content: `## The discipline

1. Red — write a failing test that describes behavior
2. Green — write the **simplest** code that passes
3. Refactor — clean up with the safety net of tests

## Aim for the right coverage

- **Services & business logic**: 90%+
- **Controllers**: covered by E2E
- **DTOs**: validation is the test
- **main.ts**: don't chase coverage here

## Final word

A well-tested Nest app is fearless. You'll refactor, upgrade, and ship Friday at 5pm — because the tests have your back.`,
      },
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
    next: idx < mod.lessons.length - 1
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
