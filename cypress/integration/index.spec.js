/// <reference types="Cypress" />

context('Homepage', () => {
  /**
   * Before each test load the main page.
   */
  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })

  it('should contain index of posts', () => {
    cy.get('.post-title').should(p => {
      expect(p).to.have.length.above(0)
    })
  })

  it('should define a robots.txt file', () => {
    cy.request('/robots.txt').then(({ status, body }) => {
      expect(status).to.equal(200)
      expect(body).to.match(/User-agent: \*/)
      expect(body).to.match(/Allow: \//)
      expect(body).to.match(/Sitemap: (.*)/)
      expect(body).to.match(/Host: (.*)/)
    })
  })
})
