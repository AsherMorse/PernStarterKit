# Implementation Template

> Quick Reference:
> - Final design decisions and rationale
> - Technical specifications and architecture
> - Database schemas and API structures
> - Important implementation details

## Architecture Decisions

### Stack Selection
- **Frontend**: [Framework/Library]
  - Reasoning: [Why this choice]
  - Key libraries: [List key dependencies]

- **Backend**: [Framework/Platform]
  - Reasoning: [Why this choice]
  - Key libraries: [List key dependencies]

- **Database**: [Database System]
  - Reasoning: [Why this choice]
  - Tools: [List key tools]

### [System Component]
- [Design Decision 1]
- [Design Decision 2]
- [Design Decision 3]

## Database Schema

### [Table Name]
```sql
CREATE TABLE [table_name] (
    [column1] [type] [constraints],
    [column2] [type] [constraints],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### [Resource Group]
```
[HTTP_METHOD] /api/[resource]/[action]
[HTTP_METHOD] /api/[resource]/[action]
```

### [Another Resource Group]
```
[HTTP_METHOD] /api/[resource]/[action]
[HTTP_METHOD] /api/[resource]/[action]
```

## Security Measures
- [Security Measure 1]
- [Security Measure 2]
- [Security Measure 3]
- [Security Measure 4]

## Deployment Strategy
- [Deployment Step 1]
- [Deployment Step 2]
- [Deployment Step 3]
- [Deployment Step 4]

## Notes
- Document all major architectural decisions
- Include rationale for important choices
- Keep API documentation up to date
- Document security measures thoroughly 