describe('Gestion des tâches', () => {
  beforeEach(() => {
    // Avant chaque test, visiter la page d'accueil
    cy.visit('/');
  });

  it('Ajoute une nouvelle tâche', () => {
    // Remplir le champ "Nom de la tâche"
    cy.get('input[placeholder="Nom de la tâche..."]').type('Nouvelle tâche');

    // Remplir le champ "Description de la tâche"
    cy.get('input[placeholder="Description de la tâche..."]').type('Description de la tâche');

    // Cliquer sur le bouton "Ajouter"
    cy.get('button').contains('Ajouter').click();

    // Vérifier que la tâche ajoutée est visible dans la liste
    cy.contains('Nouvelle tâche').should('exist');
    cy.contains('Description de la tâche').should('exist');
  });

  it('Supprime une tâche', () => {
    // Ajouter une tâche pour pouvoir la supprimer
    cy.get('input[placeholder="Nom de la tâche..."]').type('Tâche à supprimer');
    cy.get('input[placeholder="Description de la tâche..."]').type('Description de la tâche');
    cy.get('button').contains('Ajouter').click();

    // Trouver la tâche ajoutée et cliquer sur le bouton "Supprimer"
    cy.contains('Tâche à supprimer')
      .parent() // Sélectionne le parent <li> de l'élément contenant "Tâche à supprimer"
      .find('button').contains('Supprimer').click();

    // Vérifier que la tâche a été supprimée
    cy.contains('Tâche à supprimer').should('not.exist');
  });
});
