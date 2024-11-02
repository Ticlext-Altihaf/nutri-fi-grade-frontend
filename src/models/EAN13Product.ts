export interface EAN13Product {
  code?:           string;
  product?:        Product;
  status?:         number;
  status_verbose?: string;
}

export interface Product {
  _id?:                                               string;
  _keywords?:                                         string[];
  added_countries_tags?:                              any[];
  additives_n?:                                       number;
  additives_original_tags?:                           any[];
  additives_tags?:                                    any[];
  allergens?:                                         string;
  allergens_from_ingredients?:                        string;
  allergens_from_user?:                               string;
  allergens_hierarchy?:                               string[];
  allergens_tags?:                                    string[];
  amino_acids_tags?:                                  any[];
  brands?:                                            string;
  brands_tags?:                                       string[];
  categories?:                                        string;
  categories_hierarchy?:                              string[];
  categories_lc?:                                     string;
  categories_properties?:                             CategoriesProperties;
  categories_properties_tags?:                        string[];
  categories_tags?:                                   string[];
  checkers_tags?:                                     any[];
  code?:                                              string;
  codes_tags?:                                        string[];
  compared_to_category?:                              string;
  complete?:                                          number;
  completeness?:                                      number;
  correctors_tags?:                                   string[];
  countries?:                                         string;
  countries_hierarchy?:                               string[];
  countries_tags?:                                    string[];
  created_t?:                                         number;
  creator?:                                           string;
  data_quality_bugs_tags?:                            any[];
  data_quality_errors_tags?:                          any[];
  data_quality_info_tags?:                            string[];
  data_quality_tags?:                                 string[];
  data_quality_warnings_tags?:                        string[];
  data_sources?:                                      string;
  data_sources_tags?:                                 string[];
  ecoscore_data?:                                     EcoscoreData;
  ecoscore_grade?:                                    EcoscoreGrade;
  ecoscore_score?:                                    number;
  ecoscore_tags?:                                     EcoscoreGrade[];
  editors_tags?:                                      string[];
  entry_dates_tags?:                                  string[];
  food_groups_tags?:                                  any[];
  id?:                                                string;
  image_front_small_url?:                             string;
  image_front_thumb_url?:                             string;
  image_front_url?:                                   string;
  image_ingredients_small_url?:                       string;
  image_ingredients_thumb_url?:                       string;
  image_ingredients_url?:                             string;
  image_nutrition_small_url?:                         string;
  image_nutrition_thumb_url?:                         string;
  image_nutrition_url?:                               string;
  image_packaging_small_url?:                         string;
  image_packaging_thumb_url?:                         string;
  image_packaging_url?:                               string;
  image_small_url?:                                   string;
  image_thumb_url?:                                   string;
  image_url?:                                         string;
  images?:                                            Images;
  informers_tags?:                                    string[];
  ingredients?:                                       Ingredient[];
  ingredients_analysis?:                              IngredientsAnalysis;
  ingredients_analysis_tags?:                         string[];
  ingredients_hierarchy?:                             string[];
  ingredients_lc?:                                    string;
  ingredients_n?:                                     number;
  ingredients_n_tags?:                                string[];
  ingredients_non_nutritive_sweeteners_n?:            number;
  ingredients_original_tags?:                         string[];
  ingredients_percent_analysis?:                      number;
  ingredients_sweeteners_n?:                          number;
  ingredients_tags?:                                  string[];
  ingredients_text?:                                  string;
  ingredients_text_en?:                               string;
  ingredients_text_with_allergens?:                   string;
  ingredients_text_with_allergens_en?:                string;
  ingredients_with_specified_percent_n?:              number;
  ingredients_with_specified_percent_sum?:            number;
  ingredients_with_unspecified_percent_n?:            number;
  ingredients_with_unspecified_percent_sum?:          number;
  ingredients_without_ciqual_codes?:                  string[];
  ingredients_without_ciqual_codes_n?:                number;
  ingredients_without_ecobalyse_ids?:                 string[];
  ingredients_without_ecobalyse_ids_n?:               number;
  interface_version_created?:                         string;
  interface_version_modified?:                        string;
  known_ingredients_n?:                               number;
  lang?:                                              string;
  languages?:                                         Languages;
  languages_codes?:                                   LanguagesCodes;
  languages_hierarchy?:                               string[];
  languages_tags?:                                    string[];
  last_edit_dates_tags?:                              string[];
  last_editor?:                                       string;
  last_image_dates_tags?:                             string[];
  last_image_t?:                                      number;
  last_modified_by?:                                  string;
  last_modified_t?:                                   number;
  last_updated_t?:                                    number;
  lc?:                                                string;
  main_countries_tags?:                               any[];
  max_imgid?:                                         string;
  minerals_tags?:                                     any[];
  misc_tags?:                                         string[];
  no_nutrition_data?:                                 string;
  nova_group?:                                        number;
  nova_group_debug?:                                  string;
  nova_groups?:                                       string;
  nova_groups_markers?:                               { [key: string]: Array<string[]> };
  nova_groups_tags?:                                  string[];
  nucleotides_tags?:                                  any[];
  nutrient_levels?:                                   NutrientLevels;
  nutrient_levels_tags?:                              string[];
  nutriments?:                                        Nutriments;
  nutriscore?:                                        { [key: string]: Nutriscore };
  nutriscore_2021_tags?:                              string[];
  nutriscore_2023_tags?:                              string[];
  nutriscore_grade?:                                  string;
  nutriscore_tags?:                                   string[];
  nutriscore_version?:                                string;
  nutrition_data?:                                    string;
  nutrition_data_per?:                                string;
  nutrition_data_prepared_per?:                       string;
  nutrition_grade_fr?:                                string;
  nutrition_grades?:                                  string;
  nutrition_grades_tags?:                             string[];
  nutrition_score_beverage?:                          number;
  nutrition_score_debug?:                             string;
  nutrition_score_warning_no_fiber?:                  number;
  nutrition_score_warning_no_fruits_vegetables_nuts?: number;
  other_nutritional_substances_tags?:                 any[];
  packaging_materials_tags?:                          any[];
  packaging_recycling_tags?:                          any[];
  packaging_shapes_tags?:                             any[];
  packagings?:                                        any[];
  packagings_materials?:                              PackagingsMaterials;
  photographers_tags?:                                string[];
  pnns_groups_1?:                                     string;
  pnns_groups_1_tags?:                                string[];
  pnns_groups_2?:                                     string;
  pnns_groups_2_tags?:                                string[];
  popularity_key?:                                    number;
  popularity_tags?:                                   string[];
  product_name?:                                      string;
  product_name_en?:                                   string;
  product_quantity?:                                  string;
  product_quantity_unit?:                             string;
  product_type?:                                      string;
  quantity?:                                          string;
  removed_countries_tags?:                            any[];
  rev?:                                               number;
  scans_n?:                                           number;
  selected_images?:                                   SelectedImages;
  serving_quantity?:                                  string;
  serving_quantity_unit?:                             string;
  serving_size?:                                      string;
  states?:                                            string;
  states_hierarchy?:                                  string[];
  states_tags?:                                       string[];
  traces?:                                            string;
  traces_from_ingredients?:                           string;
  traces_from_user?:                                  string;
  traces_hierarchy?:                                  any[];
  traces_tags?:                                       any[];
  unique_scans_n?:                                    number;
  unknown_ingredients_n?:                             number;
  unknown_nutrients_tags?:                            any[];
  update_key?:                                        string;
  vitamins_tags?:                                     any[];
  weighers_tags?:                                     any[];
}

export interface CategoriesProperties {
  "agribalyse_food_code:en"?:       string;
  "agribalyse_proxy_food_code:en"?: string;
}

export interface EcoscoreData {
  adjustments?:          Adjustments;
  agribalyse?:           EcoscoreDataAgribalyse;
  grade?:                EcoscoreGrade;
  grades?:               { [key: string]: EcoscoreGrade };
  missing?:              Missing;
  missing_data_warning?: number;
  missing_key_data?:     number;
  previous_data?:        PreviousData;
  score?:                number;
  scores?:               { [key: string]: number };
  status?:               string;
}

export interface Adjustments {
  origins_of_ingredients?: OriginsOfIngredients;
  packaging?:              Packaging;
  production_system?:      ProductionSystem;
  threatened_species?:     PackagingsMaterials;
}

export interface OriginsOfIngredients {
  aggregated_origins?:         AggregatedOrigin[];
  epi_score?:                  number;
  epi_value?:                  number;
  origins_from_categories?:    string[];
  origins_from_origins_field?: string[];
  transportation_score?:       number;
  transportation_scores?:      { [key: string]: number };
  transportation_value?:       number;
  transportation_values?:      { [key: string]: number };
  value?:                      number;
  values?:                     { [key: string]: number };
  warning?:                    string;
}

export interface AggregatedOrigin {
  epi_score?:            string;
  origin?:               string;
  percent?:              number;
  transportation_score?: number;
}

export interface Packaging {
  value?:   number;
  warning?: string;
}

export interface ProductionSystem {
  labels?:  any[];
  value?:   number;
  warning?: string;
}

export interface PackagingsMaterials {
}

export interface EcoscoreDataAgribalyse {
  agribalyse_food_code?: string;
  co2_agriculture?:      number;
  co2_consumption?:      number;
  co2_distribution?:     number;
  co2_packaging?:        number;
  co2_processing?:       number;
  co2_total?:            number;
  co2_transportation?:   number;
  code?:                 string;
  dqr?:                  string;
  ef_agriculture?:       number;
  ef_consumption?:       number;
  ef_distribution?:      number;
  ef_packaging?:         number;
  ef_processing?:        number;
  ef_total?:             number;
  ef_transportation?:    number;
  is_beverage?:          number;
  name_en?:              string;
  name_fr?:              string;
  score?:                number;
  version?:              string;
}

export enum EcoscoreGrade {
  A = "a",
}

export interface Missing {
  labels?:     number;
  origins?:    number;
  packagings?: number;
}

export interface PreviousData {
  agribalyse?: PreviousDataAgribalyse;
  grade?:      null;
  score?:      null;
}

export interface PreviousDataAgribalyse {
  warning?: string;
}

export interface Images {
  "1"?:            The1;
  "2"?:            The1;
  "3"?:            The1;
  "4"?:            The1;
  "5"?:            The1;
  "6"?:            The1;
  "7"?:            The1;
  front_en?:       FrontEn;
  ingredients_en?: IngredientsEn;
  nutrition_en?:   FrontEn;
  nutrition_id?:   FrontEn;
  packaging_en?:   FrontEn;
}

export interface The1 {
  sizes?:      Sizes;
  uploaded_t?: number;
  uploader?:   string;
}

export interface Sizes {
  "100"?: The100;
  "400"?: The100;
  full?:  The100;
  "200"?: The100;
}

export interface The100 {
  h?: number;
  w?: number;
}

export interface FrontEn {
  angle?:                  number;
  coordinates_image_size?: string;
  geometry?:               string;
  imgid?:                  string;
  normalize?:              null;
  rev?:                    string;
  sizes?:                  Sizes;
  white_magic?:            null;
  x1?:                     string;
  x2?:                     string;
  y1?:                     string;
  y2?:                     string;
}

export interface IngredientsEn {
  angle?:                  string;
  coordinates_image_size?: string;
  geometry?:               string;
  imgid?:                  string;
  normalize?:              null;
  rev?:                    string;
  sizes?:                  Sizes;
  white_magic?:            null;
  x1?:                     string;
  x2?:                     string;
  y1?:                     string;
  y2?:                     string;
}

export interface Ingredient {
  ciqual_proxy_food_code?: string;
  ecobalyse_code?:         string;
  id?:                     string;
  is_in_taxonomy?:         number;
  percent_estimate?:       number;
  percent_max?:            number;
  percent_min?:            number;
  rank?:                   number;
  text?:                   string;
  vegan?:                  string;
  vegetarian?:             string;
  ciqual_food_code?:       string;
  percent?:                number;
  has_sub_ingredients?:    string;
}

export interface IngredientsAnalysis {
  "en:non-vegan"?:                 string[];
  "en:palm-oil-content-unknown"?:  string[];
  "en:vegan-status-unknown"?:      string[];
  "en:vegetarian-status-unknown"?: string[];
}

export interface Languages {
  "en:english"?:    number;
  "en:indonesian"?: number;
}

export interface LanguagesCodes {
  en?: number;
  id?: number;
}

export interface NutrientLevels {
  fat?:             string;
  salt?:            string;
  "saturated-fat"?: string;
  sugars?:          string;
}

export interface Nutriments {
  alcohol?:                                                       number;
  alcohol_100g?:                                                  number;
  alcohol_serving?:                                               number;
  alcohol_unit?:                                                  string;
  alcohol_value?:                                                 number;
  carbohydrates?:                                                 number;
  carbohydrates_100g?:                                            number;
  carbohydrates_serving?:                                         number;
  carbohydrates_unit?:                                            string;
  carbohydrates_value?:                                           number;
  energy?:                                                        number;
  "energy-kcal"?:                                                 number;
  "energy-kcal_100g"?:                                            number;
  "energy-kcal_serving"?:                                         number;
  "energy-kcal_unit"?:                                            string;
  "energy-kcal_value"?:                                           number;
  "energy-kcal_value_computed"?:                                  number;
  "energy-kj"?:                                                   number;
  "energy-kj_100g"?:                                              number;
  "energy-kj_serving"?:                                           number;
  "energy-kj_unit"?:                                              string;
  "energy-kj_value"?:                                             number;
  "energy-kj_value_computed"?:                                    number;
  energy_100g?:                                                   number;
  energy_serving?:                                                number;
  energy_unit?:                                                   string;
  energy_value?:                                                  number;
  fat?:                                                           number;
  fat_100g?:                                                      number;
  fat_serving?:                                                   number;
  fat_unit?:                                                      string;
  fat_value?:                                                     number;
  fiber?:                                                         number;
  fiber_100g?:                                                    number;
  fiber_serving?:                                                 number;
  fiber_unit?:                                                    string;
  fiber_value?:                                                   number;
  "fruits-vegetables-legumes-estimate-from-ingredients_100g"?:    number;
  "fruits-vegetables-legumes-estimate-from-ingredients_serving"?: number;
  "fruits-vegetables-nuts-estimate-from-ingredients_100g"?:       number;
  "fruits-vegetables-nuts-estimate-from-ingredients_serving"?:    number;
  "nova-group"?:                                                  number;
  "nova-group_100g"?:                                             number;
  "nova-group_serving"?:                                          number;
  proteins?:                                                      number;
  proteins_100g?:                                                 number;
  proteins_serving?:                                              number;
  proteins_unit?:                                                 string;
  proteins_value?:                                                number;
  salt?:                                                          number;
  salt_100g?:                                                     number;
  salt_serving?:                                                  number;
  salt_unit?:                                                     string;
  salt_value?:                                                    number;
  "saturated-fat"?:                                               number;
  "saturated-fat_100g"?:                                          number;
  "saturated-fat_serving"?:                                       number;
  "saturated-fat_unit"?:                                          string;
  "saturated-fat_value"?:                                         number;
  sodium?:                                                        number;
  sodium_100g?:                                                   number;
  sodium_serving?:                                                number;
  sodium_unit?:                                                   string;
  sodium_value?:                                                  number;
  sugars?:                                                        number;
  sugars_100g?:                                                   number;
  sugars_serving?:                                                number;
  sugars_unit?:                                                   string;
  sugars_value?:                                                  number;
}

export interface Nutriscore {
  category_available?:    number;
  data?:                  { [key: string]: number | null };
  grade?:                 string;
  nutrients_available?:   number;
  nutriscore_applicable?: number;
  nutriscore_computed?:   number;
}

export interface SelectedImages {
  front?:       Front;
  ingredients?: Front;
  nutrition?:   Nutrition;
  packaging?:   Front;
}

export interface Front {
  display?: FrontDisplay;
  small?:   FrontDisplay;
  thumb?:   FrontDisplay;
}

export interface FrontDisplay {
  en?: string;
}

export interface Nutrition {
  display?: NutritionDisplay;
  small?:   NutritionDisplay;
  thumb?:   NutritionDisplay;
}

export interface NutritionDisplay {
  en?: string;
  id?: string;
}
