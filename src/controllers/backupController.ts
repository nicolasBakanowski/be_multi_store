import { Request, Response } from "express";
import { exec } from "child_process";
import { createGzip } from "zlib";

export const downloadBackup = (req: Request, res: Response): void => {
  const { MYSQL_HOST, DB_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
    process.env;
  const host = MYSQL_HOST || DB_HOST || "db";
  const filename = `backup-${new Date().toISOString().split("T")[0]}.sql.gz`;

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/gzip");

  const dump = exec(
    `mysqldump -h ${host} -u ${MYSQL_USER} -p${MYSQL_PASSWORD} --single-transaction --routines --triggers ${MYSQL_DATABASE}`
  );

  const gzip = createGzip();
  dump.stdout!.pipe(gzip).pipe(res);

  dump.stderr!.on("data", (data: string) => {
    // mysqldump writes warnings to stderr — only abort on actual error exit
  });

  dump.on("error", () => {
    if (!res.headersSent) res.status(500).json({ error: "Backup failed" });
  });

  dump.on("close", (code: number) => {
    if (code !== 0 && !res.headersSent) {
      res.status(500).json({ error: "mysqldump exited with error" });
    }
  });
};
