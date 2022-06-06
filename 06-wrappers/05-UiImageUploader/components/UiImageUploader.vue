<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': status === 'uploading' }"
      :style="`--bg-url: url('${image}') `"
    >
      <span class="image-uploader__text">{{ imageText }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @click="startModify($event)"
        @change="changeImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      status: this.preview ? 'hasAnImage' : 'empty',
      image: this.preview,
    };
  },

  computed: {
    imageText() {
      if (this.status === 'hasAnImage') {
        return 'Удалить изображение';
      } else if (this.status === 'empty') {
        return 'Загрузить изображение';
      } else {
        return 'Загрузка...';
      }
    },
  },

  methods: {
    async changeImage() {
      const newImage = this.$refs.input.files[0];

      this.$emit('select', newImage);

      if (this.uploader) {
        this.status = 'uploading';
        try {
          this.$emit('upload', await this.uploader(newImage));
          this.status = 'hasAnImage';
        } catch (e) {
          this.$emit('error', e);
          this.$refs.input.value = '';

          if (!this.preview) {
            this.status = 'empty';
          }
        }
      } else {
        this.status = 'uploading';
        if (newImage) {
          this.image = URL.createObjectURL(newImage);
          this.status = 'hasAnImage';
        }
      }
    },
    startModify($event) {
      if (this.status === 'uploading') {
        $event.preventDefault();
        return;
      }
      if (this.image) {
        $event.preventDefault();
        this.$refs.input.value = '';
        this.image = '';
        this.status = 'empty';

        this.$emit('remove');
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
