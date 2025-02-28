import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../src/app/page';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('To-Do List', () => {
  test('Ajoute une tâche à la liste', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // Mock GET /api/tasks vide

    render(<Page />);

    const inputTitle = screen.getByPlaceholderText('Nom de la tâche...');
    const inputDescription = screen.getByPlaceholderText('Description de la tâche...');
    const addButton = screen.getByText('Ajouter');

    fireEvent.change(inputTitle, { target: { value: 'Test Jest' } });
    fireEvent.change(inputDescription, { target: { value: 'Description test' } });

    fetchMock.mockResponseOnce(JSON.stringify({ id: 1, name: 'Test Jest', description: 'Description test', status: 'PENDING' }));
   
    fireEvent.click(addButton);

    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, name: 'Test Jest', description: 'Description test', status: 'PENDING' }
    ]));

    await waitFor(() => {
      expect(screen.getByText('Test Jest')).toBeInTheDocument();
      expect(screen.getByText('Description test')).toBeInTheDocument();
    });
  });

  test('Supprime une tâche', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, name: 'Tâche à supprimer', description: 'Description de suppression', status: 'PENDING' }
    ]));

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Tâche à supprimer')).toBeInTheDocument();
    });

    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Tâche supprimée' }));

    const deleteButton = screen.getByText('Supprimer');
    fireEvent.click(deleteButton);

    fetchMock.mockResponseOnce(JSON.stringify([])); // Liste vide après suppression

    await waitFor(() => {
      expect(screen.queryByText('Tâche à supprimer')).not.toBeInTheDocument();
    });
  });
});
