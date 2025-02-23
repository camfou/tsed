import {Controller, Get, PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import {Location} from "@tsed/schema";
import {PlatformTestOptions} from "../interfaces";

@Controller("/location")
class LocationCtrl {
  @Get("/scenario-1")
  @Location("/test")
  testScenario1() {
    return "Hello";
  }
}

export function testLocation(options: PlatformTestOptions) {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    PlatformTest.bootstrap(options.server, {
      ...options,
      mount: {
        "/rest": [LocationCtrl]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  afterAll(PlatformTest.reset);

  it("Scenario1: GET /rest/location/scenario-1", async () => {
    const response = await request.get("/rest/location/scenario-1").expect(200);

    expect(response.text).toEqual("Hello");
    expect(response.header.location).toEqual("/test");
  });
}
