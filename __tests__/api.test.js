import request from 'supertest';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
import { GET, POST, DELETE } from '../src/app/api/tasks/route'; // Chemin vers tes routes API

const prisma = new PrismaClient();
let server;

jest.setTimeout(10000); // Augmente le délai d'attente à 10 secondes pour tous les tests

beforeAll(async () => {
  console.log('Démarrage du serveur...');

  // Crée un serveur HTTP pour simuler les requêtes API
  server = createServer((req, res) => {
    if (req.method === 'GET') {
      return GET(req, res);
    }
    if (req.method === 'POST') {
      return POST(req, res);
    }

    if (req.method === 'DELETE') {
      return DELETE(req, res);
    }
    res.status(404).send('Not Found');
  });

  // Connexion à la base de données via Prisma
  try {
    await prisma.$connect();
    console.log('Connexion à la base de données réussie!');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close(); // Ferme le serveur après les tests
});

describe('API /api/tasks', () => {
  let taskId;

  test('POST crée une nouvelle tâche', async (done) => {
    const newTask = { name: 'Tâche pour le test', description: 'Tester l\'API' };

    const response = await request(server)
      .post('/api/tasks')
      .send(newTask) // Envoi de la nouvelle tâche
      .expect(201); // Vérifier que le code de statut est 201

    const responseData = response.body;
    expect(responseData.name).toBe(newTask.name);
    expect(responseData.description).toBe(newTask.description);

    taskId = responseData.id; // Sauvegarde l'ID de la tâche pour les tests suivants

    done(); // Signale que le test est terminé
  });

  test('GET retourne la liste des tâches', async (done) => {
    const response = await request(server)
      .get('/api/tasks')
      .expect(200); // Vérifier que le code de statut est 200

    const responseData = response.body;
    expect(Array.isArray(responseData)).toBe(true); // Vérifie que c'est un tableau

    done(); // Signale que le test est terminé
  });

  test('DELETE supprime une tâche existante', async (done) => {
    const response = await request(server)
      .delete('/api/tasks')
      .send({ id: taskId }) // Envoi de l'ID de la tâche à supprimer
      .expect(200); // Vérifier que le code de statut est 200

    const responseData = response.body;
    expect(responseData.message).toBe('Tâche supprimée'); // Vérifie le message de confirmation

    done(); // Signale que le test est terminé
  });
});
