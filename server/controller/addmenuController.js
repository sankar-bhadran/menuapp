const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addMenu = async (req, res) => {
  const { menuName, description } = req.body;

  if (!menuName) {
    return res.status(400).json({ message: "Menu name is required." });
  }

  try {
    const newMenu = await prisma.menu.create({
      data: {
        menuName,
        description,
      },
    });
    console.log(newMenu);

    return res.status(201).json({
      message: "Menu item added successfully.",
      menu: newMenu,
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("menuName")) {
      return res.status(409).json({ message: "Menu name must be unique." });
    }

    console.error("Error adding menu:", error);
    return res.status(500).json({
      message: "An error occurred while adding the menu.",
    });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany();
    console.log(menus);
    res.status(200).json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
