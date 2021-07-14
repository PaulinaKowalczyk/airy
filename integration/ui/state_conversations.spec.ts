import {
  cyOpenStateButton,
  cyClosedStateButton,
  cyConversationListItemInfo,
  cyConversationStatus,
  cyClickableListItem,
} from 'handles';

function closeConversation() {
  cy.get(`[data-cy=${cyOpenStateButton}]`).first().click();
  cy.get(`[data-cy=${cyClosedStateButton}]`);

  const conversationStatusClosed = cy
    .get(`[data-cy=${cyConversationStatus}]`)
    .invoke('attr', 'class')
    .should('contain', 'closed');
  expect(conversationStatusClosed).to.exist;
}

function openConversation() {
  cy.get(`[data-cy=${cyClosedStateButton}]`).first().click();
  cy.get(`[data-cy=${cyOpenStateButton}]`);

  const conversationStatusOpen = cy
    .get(`[data-cy=${cyConversationStatus}]`)
    .invoke('attr', 'class')
    .should('contain', 'open');
  expect(conversationStatusOpen).to.exist;
}

describe('toggles the state of a conversation, accurately changing the Open and Closed state buttons in the ConversationList and Messenger', () => {
  it('toggles the state of a conversation', () => {
    cy.visit('/ui/');
    cy.url().should('include', '/inbox');

    cy.get(`[data-cy=${cyConversationListItemInfo}]`).then(conversationListItemInfo => {
      cy.get(`[data-cy=${cyClickableListItem}]`).first().click();

      if (conversationListItemInfo.find(`[data-cy=${cyOpenStateButton}]`).length > 0) {
        closeConversation();
        openConversation();
      } else {
        openConversation();
        closeConversation();
      }
    });
  });
});
