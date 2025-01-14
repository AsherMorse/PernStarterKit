# CHANGELOG

## 1.2.0 - 2024-01-15
### Added
- Implemented new "Advanced Search" feature in the user profile module
- Added Docker support for local development environment

### Changed
- Migrated from Passport local strategy to JWT-based authentication
- Updated React to version 18.0

### Removed
- Deprecated "Legacy Search" endpoint removed
- Unused OAuth strategy files in auth directory

### Fixed
- Resolved a bug causing the user session to expire prematurely
- Fixed typo in the database migration script for "user_profiles" table

### Security
- Patched a CSRF vulnerability in the registration endpoint
- Strengthened password hashing from 10 to 12 bcrypt rounds 