import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return Response.json(tasks);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de la récupération des tâches" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const { name, description } = await req.json();
    const newTask = await prisma.task.create({
      data: { name, description, status: "PENDING" },
    });
    return Response.json(newTask);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de l'ajout de la tâche" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    const { id, status } = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });
    return Response.json(updatedTask);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de la mise à jour de la tâche" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req) {
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
