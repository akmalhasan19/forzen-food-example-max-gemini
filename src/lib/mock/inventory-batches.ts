import type { InventoryBatch } from "@/types/domain";

export const MOCK_INVENTORY_BATCHES: InventoryBatch[] = [
  { id: "batch-001", productId: "prod-001", batchCode: "GCB-2025-001", quantityAvailable: 45, receivedAt: "2025-01-10T08:00:00Z", expiresAt: "2025-07-10T08:00:00Z", storageTempC: -18, warehouseLocation: "A-1-01" },
  { id: "batch-002", productId: "prod-002", batchCode: "BL-2025-001", quantityAvailable: 30, receivedAt: "2025-01-15T08:00:00Z", expiresAt: "2025-06-15T08:00:00Z", storageTempC: -18, warehouseLocation: "A-1-02" },
  { id: "batch-003", productId: "prod-003", batchCode: "VPT-2025-001", quantityAvailable: 60, receivedAt: "2025-01-28T08:00:00Z", expiresAt: "2025-08-28T08:00:00Z", storageTempC: -18, warehouseLocation: "A-2-01" },
  { id: "batch-004", productId: "prod-004", batchCode: "BC-2025-001", quantityAvailable: 25, receivedAt: "2025-02-01T08:00:00Z", expiresAt: "2025-07-01T08:00:00Z", storageTempC: -18, warehouseLocation: "A-2-02" },
  { id: "batch-005", productId: "prod-005", batchCode: "WSF-2025-001", quantityAvailable: 20, receivedAt: "2025-01-05T08:00:00Z", expiresAt: "2025-04-05T08:00:00Z", storageTempC: -22, warehouseLocation: "B-1-01" },
  { id: "batch-006", productId: "prod-006", batchCode: "JTS-2025-001", quantityAvailable: 35, receivedAt: "2025-01-08T08:00:00Z", expiresAt: "2025-05-08T08:00:00Z", storageTempC: -20, warehouseLocation: "B-1-02" },
  { id: "batch-007", productId: "prod-007", batchCode: "CFS-2025-001", quantityAvailable: 50, receivedAt: "2025-02-05T08:00:00Z", expiresAt: "2025-09-05T08:00:00Z", storageTempC: -18, warehouseLocation: "B-2-01" },
  { id: "batch-008", productId: "prod-008", batchCode: "GBB-2025-001", quantityAvailable: 40, receivedAt: "2025-01-14T08:00:00Z", expiresAt: "2025-07-14T08:00:00Z", storageTempC: -18, warehouseLocation: "C-1-01" },
  { id: "batch-009", productId: "prod-009", batchCode: "CBT-2025-001", quantityAvailable: 3, receivedAt: "2025-01-20T08:00:00Z", expiresAt: "2025-03-20T08:00:00Z", storageTempC: -18, warehouseLocation: "C-1-02" },
  { id: "batch-010", productId: "prod-010", batchCode: "LKK-2025-001", quantityAvailable: 15, receivedAt: "2025-02-04T08:00:00Z", expiresAt: "2025-06-04T08:00:00Z", storageTempC: -18, warehouseLocation: "C-2-01" },
  { id: "batch-011", productId: "prod-011", batchCode: "OMV-2025-001", quantityAvailable: 80, receivedAt: "2025-01-03T08:00:00Z", expiresAt: "2025-10-03T08:00:00Z", storageTempC: -18, warehouseLocation: "D-1-01" },
  { id: "batch-012", productId: "prod-012", batchCode: "CR-2025-001", quantityAvailable: 55, receivedAt: "2025-01-18T08:00:00Z", expiresAt: "2025-08-18T08:00:00Z", storageTempC: -18, warehouseLocation: "D-1-02" },
  { id: "batch-013", productId: "prod-013", batchCode: "SE-2025-001", quantityAvailable: 70, receivedAt: "2025-02-08T08:00:00Z", expiresAt: "2025-09-08T08:00:00Z", storageTempC: -18, warehouseLocation: "D-2-01" },
  { id: "batch-014", productId: "prod-014", batchCode: "VBI-2025-001", quantityAvailable: 0, receivedAt: "2025-01-24T08:00:00Z", expiresAt: "2025-04-24T08:00:00Z", storageTempC: -24, warehouseLocation: "E-1-01" },
  { id: "batch-015", productId: "prod-015", batchCode: "CLC-2025-001", quantityAvailable: 22, receivedAt: "2025-02-10T08:00:00Z", expiresAt: "2025-05-10T08:00:00Z", storageTempC: -18, warehouseLocation: "E-1-02" },
  { id: "batch-016", productId: "prod-016", batchCode: "TFB-2025-001", quantityAvailable: 38, receivedAt: "2025-02-14T08:00:00Z", expiresAt: "2025-11-14T08:00:00Z", storageTempC: -20, warehouseLocation: "E-2-01" },
  { id: "batch-017", productId: "prod-017", batchCode: "ASP-2025-001", quantityAvailable: 28, receivedAt: "2025-01-30T08:00:00Z", expiresAt: "2025-12-30T08:00:00Z", storageTempC: -18, warehouseLocation: "F-1-01" },
  { id: "batch-018", productId: "prod-018", batchCode: "KMP-2025-001", quantityAvailable: 12, receivedAt: "2025-02-16T08:00:00Z", expiresAt: "2025-06-16T08:00:00Z", storageTempC: -18, warehouseLocation: "F-1-02" },
  { id: "batch-019", productId: "prod-019", batchCode: "PW-2025-001", quantityAvailable: 42, receivedAt: "2025-02-18T08:00:00Z", expiresAt: "2025-08-18T08:00:00Z", storageTempC: -18, warehouseLocation: "F-2-01" },
  { id: "batch-020", productId: "prod-020", batchCode: "VBP-2025-001", quantityAvailable: 18, receivedAt: "2025-02-22T08:00:00Z", expiresAt: "2025-04-22T08:00:00Z", storageTempC: 2, warehouseLocation: "G-1-01" },
];
