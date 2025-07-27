# Password Reset Test Instructions

## Testing the Password Reset Flow

Follow these steps to test the complete password reset functionality:

### 1. Test OTP Email Request

1. Go to `/otp-email`
2. Enter a valid email that exists in your database (e.g., `baheer224@gmail.com`)
3. Click "Send Reset Code"
4. Check console logs for OTP generation and email sending
5. Verify email is received

### 2. Test OTP Verification

1. Go to `/otp` with the email parameter from step 1
2. Enter the OTP from the email
3. Click "Verify OTP"
4. Should redirect to `/change-password` with email and OTP parameters

### 3. Test Password Reset

1. On `/change-password` page with valid email and OTP parameters
2. Enter a new password that meets requirements:
   - At least 8 characters
   - One uppercase letter
   - One lowercase letter
   - One number
   - One special character
3. Confirm the password
4. Click "Reset Password"
5. Should show success message and redirect to sign in

### 4. Test New Password

1. Go to `/signin`
2. Sign in with the email and new password
3. Should be successful

## Common Issues Fixed

1. **Email case sensitivity** - All emails are now normalized to lowercase
2. **OTP type consistency** - OTPs are stored and compared as strings
3. **Database cleanup** - Expired OTPs are automatically cleaned up
4. **Better error handling** - More specific error messages
5. **Debugging logs** - Comprehensive logging for troubleshooting

## Debug Console Logs

Look for these log patterns:

- `🔑 Generated OTP for email: XXXXXX`
- `✅ OTP saved successfully for email: XXXXXX`
- `🔍 Verifying OTP for email with OTP: XXXXXX`
- `✅ OTP verified successfully for email`
- `✅ Password reset successfully for email`

## Troubleshooting

If OTP verification still fails:

1. Check the MongoDB Otp collection directly
2. Verify email case matches exactly
3. Check OTP expiration time (10 minutes)
4. Look for any remaining type conversion issues

## API Endpoints

- `POST /api/auth/forgot-password` - Send OTP email
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/reset-password` - Reset password with OTP
