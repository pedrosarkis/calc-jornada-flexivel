<!-- src/lib/TimePicker.svelte -->
<script>
    import { TimePicker } from 'svelte-time-picker';
    export let value;
    export let onChange;
  </script>
  
  <TimePicker {value} on:change={e => onChange(e.detail)} format="24h" />
  