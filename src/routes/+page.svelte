<script>
    
    import { addHours, calculateDuration, timeToMinutes, minutesToTime } from '../utils/time';
    import dictionary from '../utils/keyToHTMLValue';
     // import css
    import '../tailwind.css';
  
    let start1 = '08:00';
    let end1 = '';
    let start2 = '';
    let end2 = '';
  
    let maxEnd1 = '';
    let sugStart2 = '';
    let sugEnd2 = '';
  
    const summary = {
      totalShift1: '04:00',
      totalShift2: '04:30',
      totalWorked: '00:00',
      totalExpected: '08:30',
      breakTimeTaken: '00:00',
      breakTimeExpected: '01:00',
      timeBetweenShifts: '06:00',
      dailyTimeBetweenShifts: '11:00',
      overtime: '00:00'
    };
  
    $: {
      maxEnd1 = addHours(start1, 6);
      sugStart2 = addHours(end1, 1);
      
      const totalWorkedMinutes = timeToMinutes(calculateDuration(start1, end2)) - timeToMinutes(summary.breakTimeTaken);
      summary.totalWorked = minutesToTime(totalWorkedMinutes);
  
      summary.breakTimeTaken = calculateDuration(end1, start2);
      
      const totalMinutesWorked = timeToMinutes(summary.totalWorked);
      const totalMinutesExpected = timeToMinutes(summary.totalExpected);
  
      const extraHours = totalMinutesWorked > totalMinutesExpected
      
      summary.overtime = '00:00';
      if (extraHours) {
        summary.overtime = minutesToTime(totalMinutesWorked - totalMinutesExpected);
      }
  
      const minutesWorkedSoFar = timeToMinutes(end1) - timeToMinutes(start1);
      const remainingTime = 510 - minutesWorkedSoFar;
      sugEnd2 = addHours(start2, remainingTime / 60);
    }  
  </script>
  
  <main class="container mx-auto p-4 font-sans">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-600">Calculadora de Jornada Flexível</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">Registro de Horários</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="start1" class="block text-sm font-medium text-gray-700 mb-1">Entrada 1 (mín. 05:00):</label>
            <input type="time" id="start1" bind:value={start1} min="05:00" max="22:00" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="end1" class="block text-sm font-medium text-gray-700 mb-1">Saída 1:</label>
            <input type="time" id="end1" bind:value={end1} required class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="start2" class="block text-sm font-medium text-gray-700 mb-1">Entrada 2:</label>
            <input type="time" id="start2" bind:value={start2} required class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="end2" class="block text-sm font-medium text-gray-700 mb-1">Saída 2 (máx. 22:00):</label>
            <input type="time" id="end2" bind:value={end2} max="22:00" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
          </div>
        </div>
      </div>
  
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">Horários Sugeridos</h2>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Horário máximo para a saída 1:</label>
            <input type="time" value={maxEnd1} readonly class="w-full p-2 bg-gray-100 border border-gray-300 rounded-md">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">2ª Entrada Sugerida:</label>
            <input type="time" value={sugStart2} readonly class="w-full p-2 bg-gray-100 border border-gray-300 rounded-md">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">2ª Saída Sugerida:</label>
            <input type="time" value={sugEnd2} readonly class="w-full p-2 bg-gray-100 border border-gray-300 rounded-md">
          </div>
        </div>
      </div>
    </div>
  
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4 text-blue-800">Resumo</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {#each Object.entries(summary) as [key, value]}
          <div>
            <span class="text-sm font-medium text-gray-600">{dictionary[key]}:</span>
            <span class="ml-2 text-sm font-semibold {key === 'overtime' && value !== '00:00' ? 'text-red-600' : 'text-gray-900'}">{value}</span>
          </div>
        {/each}
      </div>
    </div>
  
    <div class="bg-blue-50 p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-blue-800">Informações Importantes</h2>
      <p class="text-sm text-gray-700 mb-2">
        <strong>Interjornada:</strong> O intervalo entre jornadas é de 11 horas, conforme estabelecido pela CLT (Consolidação das Leis do Trabalho). Este período de descanso é crucial para a recuperação do trabalhador e deve ser respeitado entre o término de uma jornada e o início da próxima.
      </p>
      <p class="text-sm text-gray-700">
        <strong>Lembre-se:</strong> A jornada de trabalho padrão é de 8 horas e 30 minutos, incluindo um intervalo mínimo de 1 hora para refeição e descanso.
      </p>
    </div>
  </main>
  
