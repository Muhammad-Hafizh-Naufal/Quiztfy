import { test, expect } from "@playwright/test";

const quizzes = [
  {
    id: 1,
    title: "Artificial Intelligence",
    description: "Eksplorasi dunia kecerdasan buatan dan uji pemahamanmu.",
    _count: { questions: 2 },
  },
  {
    id: 2,
    title: "Data Analyst",
    description: "Temukan cerita di balik data.",
    _count: { questions: 2 },
  },
  {
    id: 3,
    title: "Machine Learning",
    description: "Kenali pola dan prediksi dari data.",
    _count: { questions: 2 },
  },
  {
    id: 4,
    title: "Web Development",
    description: "Dari baris kode menjadi pengalaman di web.",
    _count: { questions: 2 },
  },
];
const questions = [
  {
    id: 11,
    question: "Apa itu AI?",
    options: JSON.stringify(["Mesin yang belajar", "Warna", "Kabel", "Layar"]),
  },
  {
    id: 12,
    question: "Apa contoh aplikasi AI?",
    options: JSON.stringify(
      JSON.stringify(["Asisten virtual", "Meja", "Kursi", "Pintu"]),
    ),
  },
];
const users = [
  { id: 1, fullName: "Nadia Putri", score: 240 },
  { id: 2, fullName: "Arif", score: 180 },
  { id: 3, fullName: "Budi", score: 90 },
];
const token = () =>
  "test." +
  Buffer.from(
    JSON.stringify({
      id: 1,
      fullName: "Nadia Putri",
      exp: Math.floor(Date.now() / 1000) + 3600,
    }),
  ).toString("base64url") +
  ".test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", async (route) => {
    const path = new URL(route.request().url()).pathname.replace("/api", "");
    let data;
    if (path === "/quiz") data = quizzes;
    else if (path === "/quiz/1") data = { ...quizzes[0], questions };
    else if (path === "/leaderboard") data = users;
    else if (path === "/register") data = { message: "Created" };
    else if (path === "/login") data = { token: token() };
    else if (path === "/quiz/submit") {
      const { answers } = route.request().postDataJSON();
      const results = questions.map((q, i) => {
        const answer = answers.find((a) => a.questionId === q.id)?.answer;
        const correctAnswer =
          i === 0 ? "Mesin yang belajar" : "Asisten virtual";
        return {
          questionId: q.id,
          correctAnswer,
          userAnswer: answer,
          isCorrect: answer === correctAnswer,
        };
      });
      data = {
        score: results.filter((r) => r.isCorrect).length * 10,
        totalQuestions: 2,
        results,
      };
    } else
      return route.fulfill({ status: 404, json: { message: "Not found" } });
    return route.fulfill({ json: data });
  });
});

test("home, search, leaderboard and responsive navigation", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".quiz-card")).toHaveCount(4);
  await page.screenshot({
    path: testInfo.outputPath("home-desktop.png"),
    fullPage: true,
  });
  await page.getByRole("link", { name: "Temukan tantanganmu" }).click();
  await page.getByRole("textbox", { name: "Cari topik kuis" }).fill("web");
  await expect(page.locator(".quiz-card")).toHaveCount(1);
  await page.getByRole("textbox", { name: "Cari topik kuis" }).fill("unknown");
  await expect(page.getByText("Belum ada kuis yang cocok.")).toBeVisible();
  await page.goto("/leaderboard");
  await expect(page.locator(".podium-card")).toHaveCount(3);
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/course",
      "/login",
      "/register",
      "/leaderboard",
      "/about",
    ]) {
      await page.goto(path);
      await expect(page.locator("h1, .auth-form h2").first()).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".quiz-card")).toHaveCount(4);
  await page.screenshot({
    path: testInfo.outputPath("home-mobile.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Buka navigasi" }).click();
  await page.getByRole("link", { name: "Jelajahi kuis", exact: true }).click();
  await expect(page).toHaveURL(/course/);
  expect(errors).toEqual([]);
});

test("register, login, quiz selection and server-scored review", async ({
  page,
}, testInfo) => {
  await page.goto("/register");
  await page.getByLabel("Nama lengkap").fill("Nadia Putri");
  await page.getByLabel("Email", { exact: true }).fill("nadia@example.com");
  await page.getByLabel("Password", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "Buat akun" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Akun berhasil dibuat. Silakan masuk.",
  );
  await page.getByLabel("Email", { exact: true }).fill("nadia@example.com");
  await page.getByLabel("Password", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "Masuk & mulai" }).click();
  await page
    .getByRole("link", { name: "Mulai kuis", exact: true })
    .first()
    .click();
  await expect(page.getByRole("timer")).toHaveText("01:00");
  await expect(
    page.getByRole("button", { name: "Jawab & lanjutkan" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "A Mesin yang belajar" }).click();
  await page.screenshot({
    path: testInfo.outputPath("quiz-desktop.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: testInfo.outputPath("quiz-mobile.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Jawab & lanjutkan" }).click();
  await page.getByRole("button", { name: "A Asisten virtual" }).click();
  const submitted = page.waitForRequest("**/quiz/submit");
  await page.getByRole("button", { name: "Selesaikan kuis" }).click();
  expect((await submitted).postDataJSON().answers).toHaveLength(2);
  await expect(
    page.getByRole("heading", { name: "Satu ronde. Sempurna." }),
  ).toBeVisible();
  await expect(page.locator(".result-stats")).toContainText("20");
  await expect(page.locator(".review-item")).toHaveCount(2);
});

test("timer expiry submits empty answers, not null, once", async ({ page }) => {
  await page.addInitScript(
    (value) => localStorage.setItem("token", value),
    token(),
  );
  await page.clock.install();
  let submits = 0;
  page.on("request", (request) => {
    if (request.url().endsWith("/quiz/submit")) submits++;
  });
  await page.goto("/quiz/1");
  await expect(
    page.getByRole("heading", { name: "Apa itu AI?" }),
  ).toBeVisible();
  await page.clock.fastForward(61000);
  await expect(
    page.getByRole("heading", { name: "Apa contoh aplikasi AI?" }),
  ).toBeVisible();
  const submitted = page.waitForRequest("**/quiz/submit");
  await page.clock.fastForward(61000);
  expect((await submitted).postDataJSON().answers.map((a) => a.answer)).toEqual(
    ["", ""],
  );
  await expect(
    page.getByRole("heading", { name: "Satu langkah lebih tahu." }),
  ).toBeVisible();
  expect(submits).toBe(1);
});

test("catalog failure can recover and invalid session redirects", async ({
  page,
}) => {
  await page.route("**/api/quiz", (route) =>
    route.fulfill({
      status: 500,
      json: { message: "Server sementara tidak tersedia" },
    }),
  );
  await page.goto("/course");
  await expect(page.getByRole("alert")).toContainText(
    "Server sementara tidak tersedia",
  );
  await page.unroute("**/api/quiz");
  await page.getByRole("button", { name: "Coba lagi" }).click();
  await expect(page.locator(".quiz-card")).toHaveCount(4);
  await page.evaluate(() => localStorage.setItem("token", "invalid"));
  await page.goto("/quiz/1");
  await expect(page).toHaveURL(/login/);
});

test("quiz submission failure retains answers for retry", async ({ page }) => {
  await page.addInitScript(
    (value) => localStorage.setItem("token", value),
    token(),
  );
  await page.goto("/quiz/1");
  await page.getByRole("button", { name: "A Mesin yang belajar" }).click();
  await page.getByRole("button", { name: "Jawab & lanjutkan" }).click();
  await page.getByRole("button", { name: "A Asisten virtual" }).click();
  await page.route("**/api/quiz/submit", (route) =>
    route.fulfill({ status: 500, json: { message: "Coba lagi nanti" } }),
  );
  await page.getByRole("button", { name: "Selesaikan kuis" }).click();
  await expect(page.getByRole("alert")).toContainText("Coba lagi nanti");
  await page.unroute("**/api/quiz/submit");
  await page.getByRole("button", { name: "Kirim ulang jawaban" }).click();
  await expect(
    page.getByRole("heading", { name: "Satu ronde. Sempurna." }),
  ).toBeVisible();
});
