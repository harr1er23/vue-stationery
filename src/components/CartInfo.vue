<script setup>

</script>

<template>
    <div class="flex flex-col gap-4 mt-7">
        <div class=" flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>25 ₽</b>
        </div>

        <div class=" flex gap-2">
            <span>Налог 5%</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>900 ₽</b>
        </div>

        <button disabled="true"
            class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 cursor-pointer">
            Оформить заказ
        </button>
    </div>
</template>