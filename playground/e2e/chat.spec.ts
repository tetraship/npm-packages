import { test, expect } from '@playwright/test';

test('chat interface interaction', async ({ page }) => {
  // Navigate to chat page
  await page.goto('/chat');
  
  // Check if title is visible
  await expect(page.locator('h1')).toContainText('Agent Chat Demo');
  
  // Type a message
  const input = page.locator('input[placeholder="Type a message..."]');
  await input.fill('Hello agent');
  
  // Click send
  const sendButton = page.locator('button[aria-label="Send message"]');
  await expect(sendButton).toBeEnabled();
  await sendButton.click();
  
  // Verify user message appears
  await expect(page.locator('div[data-message-bubble][data-role="user"]')).toContainText('Hello agent');
  
  // Wait for agent response (mocked in route.ts)
  await expect(page.locator('div[data-message-bubble][data-role="assistant"]')).toContainText('Hello from the agent!');
});
