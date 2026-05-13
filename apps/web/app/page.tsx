import { PaymentsTable } from '@ui';

export default async function Index() {
  const response = await fetch(`${process.env.API_URL}/payments`);
  const items = await response.json();

  return <PaymentsTable items={items} />;
}
