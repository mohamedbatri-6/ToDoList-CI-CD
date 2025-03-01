const { PrismaClient } = require('@prisma/client'); // Remplace import par require

const prisma = new PrismaClient();

async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de la récupération des tâches" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function POST(req) {
  try {
    const { name, description } = await req.json();
    const newTask = await prisma.task.create({
      data: { name, description, status: "PENDING" },
    });
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de l'ajout de la tâche" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


async function DELETE(req) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });
    return new Response(JSON.stringify({ message: "Tâche supprimée" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de la suppression de la tâche" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

module.exports = { GET, POST, DELETE }; // Utilise module.exports
