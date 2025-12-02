import bcrypt from "bcrypt";

const run = async () => {
  const hash = await bcrypt.hash("Super@2025", 10);
  console.log(hash);
};

run();
