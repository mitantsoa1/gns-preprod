"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Pencil, X, KeyRound } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserProfile } from "@/actions/user-actions";
import { changePasswordAction } from "@/actions/auth-actions";
import { User } from "@/types/auth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

// Zod schema for password validation
const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const t = useTranslations("ProfilePage");
  const tCommon = useTranslations("common");

  const [state, formAction, isPending] = useActionState(updateUserProfile, {
    error: null,
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState(user.image ?? "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  useEffect(() => {
    if (state?.success) {
      // Exit edit mode on successful update
      setIsEditMode(false);
    }
  }, [state?.success]);

  // Format date for display
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle password change
  const handlePasswordChange = async () => {
    setPasswordError(null);

    // Validate with Zod
    const validation = passwordChangeSchema.safeParse(passwordForm);

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      setPasswordError(firstError.message);
      // Keep dialog open - user must close manually
      return;
    }

    setIsPasswordChanging(true);

    try {
      // Create FormData for server action
      const formData = new FormData();
      formData.append("current-password", passwordForm.currentPassword);
      formData.append("password", passwordForm.newPassword);

      // Call server action
      const result = await changePasswordAction(null, formData);

      if (result.success) {
        // Show success toast
        toast.success(t('form.passwordChangeSuccess'));

        // Close dialog and reset form
        setIsPasswordDialogOpen(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordError(null);
      } else {
        // Show error in dialog - keep dialog open for user to see and close manually
        setPasswordError(result.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      // Show error in dialog - keep dialog open
      setPasswordError("Une erreur est survenue lors de la modification du mot de passe");
    } finally {
      setIsPasswordChanging(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form action={formAction} ref={formRef}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("title")}</CardTitle>
              <CardDescription>{t("subtitle")}</CardDescription>
            </div>
            {!isEditMode && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                {tCommon("edit")}
              </Button>
            )}
            {isEditMode && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditMode(false);
                  setImage(user.image ?? "");
                }}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                {tCommon("cancel")}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pb-6">
          {/* Success Message */}
          {state?.success && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200">
              {t("form.success")}
            </div>
          )}

          {/* Error Message */}
          {state?.error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
              {state.error}
            </div>
          )}

          {/* Profile Image */}
          {/* <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={image || undefined} alt={user.name ?? ""} />
              <AvatarFallback className="text-3xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Field className="w-full">
              <FieldLabel htmlFor="image">{t("form.image")}</FieldLabel>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.png"
                defaultValue={user.image ?? ""}
                onChange={(e) => setImage(e.target.value)}
                disabled={!isEditMode}
                readOnly={!isEditMode}
              />
            </Field>
          </div> */}

          {/* Editable Fields */}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">{t("form.name")}</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                defaultValue={user.name ?? ""}
                required
                disabled={!isEditMode}
                readOnly={!isEditMode}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">{t("form.email")}</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email ?? ""}
                disabled
                readOnly
                className="bg-gray-50"
              />
            </Field>
          </FieldGroup>

          {/* Read-only Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">{t('form.accountInformation')}</h3>
            <FieldGroup>
              <Field>
                <FieldLabel>ID</FieldLabel>
                <Input
                  type="text"
                  value={user.id}
                  disabled
                  readOnly
                  className="bg-gray-50 font-mono text-sm"
                />
              </Field>

              <Field className="mb-6">
                <div className="flex items-center">
                  <FieldLabel className="mr-4">{t('form.emailVerified')}</FieldLabel>
                  {user.emailVerified ? (
                    <div className="flex items-center gap-1 text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-700">
                      <X className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>{t('form.createdOn')}</FieldLabel>
                <Input
                  type="text"
                  value={formatDate(user.createdAt)}
                  disabled
                  readOnly
                  className="bg-gray-50"
                />
              </Field>

              <Field>
                <FieldLabel>{t('form.updatedOn')}</FieldLabel>
                <Input
                  type="text"
                  value={formatDate(user.updatedAt)}
                  disabled
                  readOnly
                  className="bg-gray-50"
                />
              </Field>
            </FieldGroup>

            {user.stripeCustomerId && (
              <Field>
                <FieldLabel>ID Stripe</FieldLabel>
                <Input
                  type="text"
                  value={user.stripeCustomerId}
                  disabled
                  readOnly
                  className="bg-gray-50 font-mono text-sm"
                />
              </Field>
            )}
          </div>

          {/* Security Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">{t('form.security')}</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <p className="font-medium">{t('form.password')}</p>
                <p className="text-sm text-gray-600">{t('form.passwordDescription')}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <KeyRound className="h-4 w-4" />
                {t('form.changePassword')}
              </Button>
            </div>
          </div>
        </CardContent>
        {isEditMode && (
          <CardFooter className="border-t bg-gray-50/50 px-6 py-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditMode(false);
                setImage(user.image ?? "");
              }}
              disabled={isPending}
            >
              {tCommon("cancel")}
            </Button>
            {isEditMode &&
              <Button
                type="submit"
                disabled={isPending}
                style={{ backgroundColor: "var(--jaune)", color: "var(--primary)" }}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t("form.submit")}
              </Button>
            }
          </CardFooter>
        )}
      </form>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('form.changePassword')}</DialogTitle>
            <DialogDescription>
              {t('form.changePasswordDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {passwordError && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
                {passwordError}
              </div>
            )}
            <Field>
              <FieldLabel htmlFor="currentPassword">{t('form.currentPassword')}</FieldLabel>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                placeholder="••••••••"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="newPassword">{t('form.newPassword')}</FieldLabel>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="••••••••"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">{t('form.confirmNewPassword')}</FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsPasswordDialogOpen(false);
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                setPasswordError(null);
              }}
            >
              {tCommon('cancel')}
            </Button>
            <Button
              type="button"
              onClick={handlePasswordChange}
              disabled={isPasswordChanging}
              style={{ backgroundColor: "var(--jaune)", color: "var(--primary)" }}
            >
              {isPasswordChanging ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t('form.changePassword')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
