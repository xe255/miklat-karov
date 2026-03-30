-- Run in Supabase SQL Editor only if you use `"privateChannel": true` in presence-config.json
-- (Dashboard → Realtime → disable "Allow public access" requires private channels + these policies).
-- With `"privateChannel": false` and public Realtime access, you do not need this file.
-- Topic must match presence-config.json "topic" / "channelName" (default: miklat-site-live).

drop policy if exists "site_presence_can_receive" on realtime.messages;
drop policy if exists "site_presence_can_track" on realtime.messages;
drop policy if exists "site_presence_can_receive_anon" on realtime.messages;
drop policy if exists "site_presence_can_track_anon" on realtime.messages;

-- Authenticated (includes users after signInAnonymously)
create policy "site_presence_can_receive"
on realtime.messages for select
to authenticated
using (
  realtime.messages.extension = 'presence'
  and (
    (select realtime.topic()) = 'miklat-site-live'
    or (select realtime.topic()) like '%miklat-site-live%'
  )
);

create policy "site_presence_can_track"
on realtime.messages for insert
to authenticated
with check (
  realtime.messages.extension = 'presence'
  and (
    (select realtime.topic()) = 'miklat-site-live'
    or (select realtime.topic()) like '%miklat-site-live%'
  )
);

-- If Realtime still evaluates as anon for some joins, mirror for anon:
create policy "site_presence_can_receive_anon"
on realtime.messages for select
to anon
using (
  realtime.messages.extension = 'presence'
  and (
    (select realtime.topic()) = 'miklat-site-live'
    or (select realtime.topic()) like '%miklat-site-live%'
  )
);

create policy "site_presence_can_track_anon"
on realtime.messages for insert
to anon
with check (
  realtime.messages.extension = 'presence'
  and (
    (select realtime.topic()) = 'miklat-site-live'
    or (select realtime.topic()) like '%miklat-site-live%'
  )
);
