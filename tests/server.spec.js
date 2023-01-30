const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Test 1: Obtener el listado de cafés", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    const body = response.body;
    console.log(body.length);
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.length).toBeGreaterThan(0);
  });

  it("Test 2: Eliminar un cafe", async () => {
    const jwt = "Token";
    const idProductoAEliminar = 100;
    const response = await request(server)
      .delete(`/cafes/${idProductoAEliminar}`)
      .set("Authorization", jwt)
      .send();
    expect(response.status).toBe(404);
  });

  it("Test 3: Crear un nuevo café", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "Nuevo café" };
    const { body: cafes } = await request(server).post("/cafes").send(cafe);
    expect(cafes).toContainEqual(cafe);
  });

  it("Test 4: Actualizar un café enviando un ID en los parametros que sea diferente al ID dentro del Payload", async () => {
    const cafe = {id: 2, nombre: "Mokalatte Explosivo"};
      const response = await request(server).put("/cafes/2").send(cafe);
      const status = response.statusCode;
      expect(status).toBe(400);
  });
});
