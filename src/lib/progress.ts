import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth";

export function useProgress() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: completed = [] } = useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data.map((r) => r.lesson_id);
    },
  });

  const toggle = useMutation({
    mutationFn: async ({ lessonId, done }: { lessonId: string; done: boolean }) => {
      if (!user) throw new Error("Not signed in");
      if (done) {
        const { error } = await supabase
          .from("lesson_progress")
          .upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: "user_id,lesson_id" });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("lesson_id", lessonId);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["progress", user?.id] }),
  });

  const set = new Set(completed);
  return {
    completedIds: set,
    count: set.size,
    isDone: (id: string) => set.has(id),
    toggle: (lessonId: string, done: boolean) => toggle.mutate({ lessonId, done }),
  };
}
