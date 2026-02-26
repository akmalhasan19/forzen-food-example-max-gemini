# Supabase Adapter

This directory will contain the Supabase implementation of the service interfaces.

When ready to connect to Supabase:
1. Create `product.repository.supabase.ts` implementing `IProductService`
2. Create `order.repository.supabase.ts` implementing `IOrderService`
3. Create `user.repository.supabase.ts` implementing `IUserService`
4. Update the service factory files to use the Supabase adapters
