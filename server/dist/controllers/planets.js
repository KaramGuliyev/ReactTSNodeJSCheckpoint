import Joi from "joi";
let planets = [
    {
        id: 1,
        name: "Earth",
        check: false,
    },
    {
        id: 2,
        name: "Mars",
        check: false,
    },
];
const getAll = (req, res) => {
    res.status(200).json(planets);
};
const getOneById = (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet);
};
const planetsSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    check: Joi.boolean(),
});
const createOne = (req, res) => {
    const { id, name } = req.body;
    const newPlanet = {
        id: Number(id),
        name: name,
        check: false,
    };
    const validateNewPlanet = planetsSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        return res.status(400).json({
            msg: validateNewPlanet.error.details[0].message,
        });
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({
            msg: "Planet created successfully!",
            planets: planets,
        });
    }
};
const updateOneById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((pEl) => pEl.id === Number(id) ? Object.assign(Object.assign({}, pEl), { name }) : pEl);
    res.status(201).json({
        msg: "Planet Updated successfully!",
        planets: planets,
    });
};
const check = (req, res) => {
    const { id } = req.body;
    const { check } = req.body;
    planets = planets.map((pEl) => {
        return pEl.id === Number(id)
            ? Object.assign(Object.assign({}, pEl), { check: !check }) : pEl;
    });
    res.status(201).json({
        msg: "Planet Updated successfully!",
        planets: planets,
        dsc: { id, check },
    });
};
const deleteOneById = (req, res) => {
    const { id } = req.params;
    planets = planets.filter((el) => el.id !== Number(id));
    res.status(200).json({
        msg: "Planet deleted successfully!",
        planets: planets,
    });
};
export { getAll, getOneById, createOne, check, updateOneById, deleteOneById, };
// I already did that part for Ex-12, Everything tested works perfectly!
