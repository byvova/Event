import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = params;

    // Update order status to in_progress
    const result = await sql`
      UPDATE contractor_orders
      SET status = 'in_progress',
          started_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${orderId}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      order: result[0],
      message: "Job started successfully",
    });
  } catch (err) {
    console.error("POST /api/contractor/orders/[orderId]/start error:", err);
    return Response.json({ error: "Failed to start job" }, { status: 500 });
  }
}
