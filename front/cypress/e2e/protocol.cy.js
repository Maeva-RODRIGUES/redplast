describe('Page Protocol', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('devrait charger la page d’accueil', () => {
    cy.contains('Protocoles')
  })

  it('devrait afficher au moins une carte de protocole', () => {
    cy.get('[data-testid="protocol-card"]').should('exist')
  })
})
