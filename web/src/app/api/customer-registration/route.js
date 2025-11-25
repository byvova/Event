import sql from "@/app/api/utils/sql";
import { hash } from "argon2";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      email,
      password,
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

    console.log("Starting customer registration for:", email);

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      console.log("Missing required fields:", {
        email: !!email,
        password: !!password,
        firstName: !!firstName,
        lastName: !!lastName,
      });
      return Response.json(
        { error: "Email, password, first name, and last name are required" },
        { status: 400 },
      );
    }

    // Check if user already exists in auth database
    console.log("Checking if user exists...");
    const existingUser = await sql`
      SELECT id FROM auth_users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      console.log("User already exists:", email);
      return Response.json(
        { error: "An account with this email already exists" },
        { status: 400 },
      );
    }

    // Hash the password
    console.log("Hashing password...");
    const hashedPassword = await hash(password);
    console.log("Password hashed successfully");

    // Create user account in auth database
    console.log("Creating user in auth database...");
    const userResult = await sql`
      INSERT INTO auth_users (name, email)
      VALUES (${firstName + " " + lastName}, ${email})
      RETURNING id
    `;
    console.log("User created with ID:", userResult[0].id);

    const userId = userResult[0].id;

    // Create auth account with hashed password in auth database
    console.log("Creating auth account...");
    await sql`
      INSERT INTO auth_accounts (
        "userId",
        type,
        provider,
        "providerAccountId",
        password
      ) VALUES (
        ${userId},
        'credentials',
        'credentials',
        ${email},
        ${hashedPassword}
      )
    `;
    console.log("Auth account created successfully");

    // Create customer profile in the same database (no longer using separate database)
    console.log("Creating customer profile...");
    const profileResult = await sql`
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
      RETURNING id
    `;
    console.log("Customer profile created with ID:", profileResult[0].id);

    console.log("Registration completed successfully for:", email);
    return Response.json({
      success: true,
      message: "Account created successfully",
      userId,
      profileId: profileResult[0].id,
    });
  } catch (err) {
    console.error("POST /api/customer-registration error:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });

    return Response.json(
      {
        error: "Failed to create account. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 },
    );
  }
}
