import { faker } from "@faker-js/faker";

function createRandomPayments() {
	return {
		id: faker.string.uuid(),
		date: faker.date.past(),
		description: faker.finance.transactionDescription(),
		amount: faker.finance.amount(),
	};
}
const payments = faker.helpers.multiple(createRandomPayments, {
	count: 200,
});

const RECORDS_PER_PAGE = 5;

export default function handler(req, res) {
	let paymentsPaging = payments.slice(
		(req.query.page - 1) * RECORDS_PER_PAGE,
		RECORDS_PER_PAGE * req.query.page,
	);

	res.status(200).json({ payments: paymentsPaging, total: 5 });
}
