import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Your profile — NestMastery" }] }),
});

const profileSchema = z.object({
  display_name: z.string().trim().max(80).optional(),
  avatar_url: z.string().trim().url().max(500).optional().or(z.literal("")),
  bio: z.string().trim().max(500).optional(),
});

function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/login" });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, avatar_url, bio")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? "");
        setAvatarUrl(data?.avatar_url ?? "");
        setBio(data?.bio ?? "");
        setLoading(false);
      });
  }, [user]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = profileSchema.safeParse({ display_name: displayName, avatar_url: avatarUrl, bio });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      display_name: parsed.data.display_name || null,
      avatar_url: parsed.data.avatar_url || null,
      bio: parsed.data.bio || null,
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  };

  if (authLoading || loading) {
    return <div className="container mx-auto p-8 text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="container mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Your profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
      <form onSubmit={onSave} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="name">Display name</Label>
          <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input id="avatar" type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} maxLength={500} />
        </div>
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
      </form>
    </div>
  );
}
