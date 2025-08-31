## Project Description  

This is a **payments application** built as a learning project to explore how financial transactions work end-to-end. The project is structured as a **Turborepo**, with shared packages for UI and database.  

- **Frontend & Backend:** Next.js with Tailwind CSS for modern UI and server-side logic  
- **Bank Webhook:** Node.js and Express.js to simulate transaction responses  
- **Database:** PostgreSQL (containerized with Docker) managed via Prisma ORM  
- **Key Learnings:**  
  - Row-level locking in PostgreSQL to prevent race conditions and ensure consistency during concurrent transactions  
  - Setting up a monorepo architecture with Turborepo for efficient package sharing  

This project was developed to gain hands-on experience with **transaction handling, database integrity, and scalable project structuring**.  
