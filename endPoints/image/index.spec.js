const imageHandler = require("./index");

const common = ()=>  ({
});
describe("Endpoints image upload", () => {

	it("Should save image in local",async()=>{

		const ctx = {
			state: {}
		}

		const next = jest.fn();

		const serviceMulter = jest.fn();

		await imageHandler({serviceMulter}).upload(ctx,next);

		expect(serviceMulter.mock.calls.length).toBe(1)

	});
});