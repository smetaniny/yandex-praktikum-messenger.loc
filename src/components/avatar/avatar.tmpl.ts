export default
`<div class='avatar-container'>
    <div class='photo-container' data-modal-id='changePhoto'>
      <img id='avatar' src='{{src}}' class='{{className}}' >
      <div class='photo-overlay'>
        <div class='overlay-text'>Поменять аватар</div>
      </div>
    </div>
    <div id='changePhoto' class='eins-modal'>
      <div class='eins-modal-content'>
        <p class='eins-modal__header'>
          Загрузите фото
        </p>
        <label class='eins-modal__upload'>
          <input
            class='eins-modal__input input-avatar'
            type='file'
            id='input-avatar'
            data-id='{{id}}'
          />
          Выбрать файл на компьютере
        </label>
      </div>
    </div>
</div>`;
