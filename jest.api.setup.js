process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = 'file:./test.db';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma est connecté à la base de données avec succès !');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erreur de connexion à Prisma :', error);
  }
}

testPrismaConnection();
