use super::*;

#[tokio::test]
async fn should_return_an_array_of_patients() {
    let service = service_factory().await;
    let dto = GetByName("Souza".to_string());

    let result = service.get_by_name(dto).await.unwrap();

    assert_eq!(result.len(), 2);
}
