import databaseMain from "../../database/main.json";

export async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const section = searchParams.get("section");
  const [lowerLimit, upperLimit] = (searchParams.get("range") || "")
    .split("..")
    .map(Number);

  if (!section || isNaN(lowerLimit) || isNaN(upperLimit)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid parameters" }));
    return;
  }

  const getResponse = (data) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data.slice(lowerLimit, upperLimit)));
  };

  if (section === "mostUsed") {
    return getResponse(databaseMain);
  }

  if (section === "latestRepos") {
    return getResponse(
      [...databaseMain].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    );
  }

  res.statusCode = 400;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Invalid section" }));
}
