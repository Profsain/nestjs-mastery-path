CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own progress" ON public.lesson_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users insert own progress" ON public.lesson_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own progress" ON public.lesson_progress
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);