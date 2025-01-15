# Codebase Organization Guide

This guide outlines best practices for maintaining our project stack (Express.js, React, Node.js, and PostgreSQL) without TypeScript. Instead, we rely on inline JSDoc-style comments within each file and at the top of every function for clarity.

## File Management

### File Size and Structure
• Keep files under 250 lines to ensure complete context in single reads.  
• When a file grows too large:  
  – Split it into logical units.  
  – Maintain complete context within each unit.  
  – Add clear cross-references to related files.

### New File Creation
• Begin each file with a summary block explaining its purpose.  
• Group imports logically (e.g., external packages vs. local modules).  
• Keep function-level documentation above each function (using JSDoc or a similar style).  
• Use concise sections to make navigation clear.

## Code Organization

### Logical Units
• Group code by feature or function.  
• Mark explicit section boundaries (e.g., “// ---- Validation” or “// ---- Database Access”).  
• Combine related logic into small modules for clarity.  
• Reference other modules when necessary.

## Naming Conventions

### Functions
• Give functions expressive verb-based names (e.g., validateUserCredentials).  
• Indicate the intended action or transformation (e.g., parseFormData).  
• Precede each function with a short JSDoc block describing parameters, returns, and purpose.

### Variables
• Use prefixes like is, has, or should for booleans to add clarity.  
• Maintain consistent terminology throughout the codebase.

## Directory Structure

### Root Organization
• Organize src/ by features (e.g., user/, auth/, database/) and shared components (e.g., common/).  
• Keep a consistent internal structure across features.

### Feature Structure
• Each feature directory might include:  
  – components/ (React components)  
  – hooks/ (React hooks)  
  – utils/ (utility functions)  
  – README.md (short feature overview)

## File Patterns

### Component Files
• Follow naming: feature-name.component.js (for React components).  
• Keep each component focused on a single purpose.  
• Include all relevant prop details in a JSDoc block at the top of the file or before the component.

### Utility Files
• Follow naming: feature-name.utils.js.  
• Focus on a single functionality or set of closely related functions.  
• Use named exports with short, descriptive function docs.

## Documentation

### Comments
• Start each file with a short description of its purpose.  
• Use JSDoc-compatible comments before each function, describing parameters and return values.  
• Provide additional context for complex logic, explaining why certain decisions were made.

### README Files
• Include a brief description of each feature’s purpose.  
• List any key dependencies, usage examples, or relevant environment variables.

## Best Practices
• Always document functions via inline JSDoc blocks (parameters, returns, usage).  
• Keep the code DRY (Don’t Repeat Yourself); refactor when you see duplication.  
• Commit changes frequently with meaningful messages.  
• Before merging, ensure you’ve updated or created tests around new or modified features. 