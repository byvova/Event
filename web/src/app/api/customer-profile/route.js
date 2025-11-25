import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const rows = await sql`
      SELECT * FROM customer_profiles 
      WHERE user_id = ${userId} 
      LIMIT 1
    `;

    const profile = rows?.[0] || null;
    return Response.json({ profile });
  } catch (err) {
    console.error("GET /api/customer-profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Check if this is a registration request (userId provided) or authenticated request
    let userId = body.userId;

    if (!userId) {
      // If no userId provided, check for authenticated session
      const session = await auth();
      if (!session || !session.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
      userId = session.user.id;
    }

    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      profilePhoto,
      street,
      city,
      state,
      zipCode,
      propertyType,
      emergencyContactName,
      emergencyContactPhone,
      servicePreferences,
      communicationPreferences,
      notificationsEnabled,
    } = body;

    // Check if profile already exists
    const existing = await sql`
      SELECT id FROM customer_profiles 
      WHERE user_id = ${userId}
    `;

    if (existing.length > 0) {
      return Response.json(
        {
          error: "Profile already exists. Use PUT to update.",
        },
        { status: 400 },
      );
    }

    // Create new profile
    const result = await sql`
      INSERT INTO customer_profiles (
        user_id,
        first_name,
        last_name,
        phone,
        date_of_birth,
        profile_photo,
        street,
        city,
        state,
        zip_code,
        property_type,
        emergency_contact_name,
        emergency_contact_phone,
        service_preferences,
        communication_preferences,
        notifications_enabled
      ) VALUES (
        ${userId},
        ${firstName},
        ${lastName},
        ${phone || null},
        ${dateOfBirth || null},
        ${profilePhoto || null},
        ${street || null},
        ${city || null},
        ${state || null},
        ${zipCode || null},
        ${propertyType || null},
        ${emergencyContactName || null},
        ${emergencyContactPhone || null},
        ${servicePreferences || []},
        ${communicationPreferences || []},
        ${notificationsEnabled !== undefined ? notificationsEnabled : true}
      )
      RETURNING *
    `;

    return Response.json({ profile: result[0] });
  } catch (err) {
    console.error("POST /api/customer-profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    const allowedFields = {
      firstName: "first_name",
      lastName: "last_name",
      phone: "phone",
      dateOfBirth: "date_of_birth",
      profilePhoto: "profile_photo",
      street: "street",
      city: "city",
      state: "state",
      zipCode: "zip_code",
      propertyType: "property_type",
      emergencyContactName: "emergency_contact_name",
      emergencyContactPhone: "emergency_contact_phone",
      servicePreferences: "service_preferences",
      communicationPreferences: "communication_preferences",
      notificationsEnabled: "notifications_enabled",
    };

    for (const [key, dbColumn] of Object.entries(allowedFields)) {
      if (body[key] !== undefined) {
        updates.push(`${dbColumn} = $${paramCount}`);
        values.push(body[key]);
        paramCount++;
      }
    }

    if (updates.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    // Add updated_at timestamp
    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = `
      UPDATE customer_profiles 
      SET ${updates.join(", ")}
      WHERE user_id = $${paramCount}
      RETURNING *
    `;

    values.push(userId);

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ profile: result[0] });
  } catch (err) {
    console.error("PUT /api/customer-profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
