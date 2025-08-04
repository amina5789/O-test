import { Folder } from "../../types";

export const mockFolders: Folder[] = [
  {
    id: 1,
    name: "Финансы",
    createdAt: "2024-07-01",
    files: [
      {
        id: 1,
        name: "Отчет Q1.pdf",
        path: "/pdfs/q1.pdf",
        uploadedAt: "2024-07-01",
        folderId: 1,
      },
      {
        id: 2,
        name: "Отчет Q2.pdf",
        path: "/pdfs/q2.pdf",
        uploadedAt: "2024-07-01",
        folderId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Общая",
    createdAt: "2024-07-02",
    files: [
      {
        id: 3,
        name: "План.pdf",
        path: "/pdfs/plan.pdf",
        uploadedAt: "2024-07-02",
        folderId: 2,
      },
    ],
  },
];
