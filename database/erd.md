# FrozenFresh – Entity Relationship Diagram

```mermaid
erDiagram
    PROFILES {
        uuid id PK
        text email UK
        text full_name
        user_role role
        text phone
        text avatar_url
        timestamptz created_at
        timestamptz updated_at
    }

    CATEGORIES {
        uuid id PK
        text slug UK
        text name
        text description
        text image_url
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    PRODUCTS {
        uuid id PK
        uuid category_id FK
        text slug UK
        text name
        text description
        text image_url
        integer price_cents
        integer weight_grams
        temperature_requirement temperature_requirement
        text_array diet_tags
        boolean is_flash_sale
        timestamptz flash_sale_ends_at
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    INVENTORY_BATCHES {
        uuid id PK
        uuid product_id FK
        text batch_code UK
        integer quantity_available
        timestamptz received_at
        timestamptz expires_at
        numeric storage_temp_c
        text warehouse_location
    }

    ORDERS {
        uuid id PK
        uuid profile_id FK
        order_status status
        shipping_method shipping_method
        integer subtotal_cents
        integer shipping_cents
        integer discount_cents
        integer total_cents
        timestamptz delivery_slot_start
        timestamptz delivery_slot_end
        jsonb delivery_address
        integer melting_estimate_minutes
        timestamptz created_at
        timestamptz updated_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        uuid inventory_batch_id FK
        integer quantity
        integer unit_price_cents
        integer line_weight_grams
        integer line_total_cents
    }

    CATEGORIES ||--o{ PRODUCTS : "has many"
    PRODUCTS ||--o{ INVENTORY_BATCHES : "tracked in"
    PROFILES ||--o{ ORDERS : "places"
    ORDERS ||--o{ ORDER_ITEMS : "contains"
    PRODUCTS ||--o{ ORDER_ITEMS : "referenced by"
    INVENTORY_BATCHES ||--o{ ORDER_ITEMS : "sourced from"
```

## Key Relationships

| From            | To                | Type     | Notes                                    |
| --------------- | ----------------- | -------- | ---------------------------------------- |
| categories      | products          | 1 : N    | A category has many products             |
| products        | inventory_batches | 1 : N    | Each product can have multiple batches   |
| profiles        | orders            | 1 : N    | A profile can place many orders          |
| orders          | order_items       | 1 : N    | An order contains many line items        |
| products        | order_items       | 1 : N    | A product appears in many order items    |
| inventory_batch | order_items       | 1 : N    | Nullable FK for batch-level traceability |

## Notable Design Decisions

- **Cents-based pricing**: All monetary values stored as integers (cents) to avoid floating-point issues.
- **Weight in grams**: Internal unit is grams; converted to lb/oz on the frontend for US market.
- **JSONB delivery address**: Flexible schema for address data, avoids extra join table.
- **Soft-delete via `is_active`**: Products and categories use `is_active` flag instead of hard delete.
- **Array-based diet tags**: PostgreSQL `text[]` for multi-label tagging without a join table.
